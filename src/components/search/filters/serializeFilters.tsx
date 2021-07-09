import Filter, { FilterType } from './Filter';

const getDefaultFilter = () => ({
  query: {
    bool: {
      must: [],
    },
  },
  sort: [{ 'coralogix.timestamp': { order: 'desc' } }],
  size: 5000,
});

const splitFiltersOnTypes = (filters: Filter[]) => {
  const filterOnTypes: Map<string, Filter[]> = new Map();
  filters.forEach((filter: Filter) => {
    const filterOnType = filterOnTypes.get(filter.type);
    if (!filterOnType) {
      filterOnTypes.set(filter.type, [filter]);
      return;
    }
    filterOnType.push(filter);
  });

  return filterOnTypes;
};

const serializeMatchFilters = (filters?: Filter[], serializedFilters: any) => {
  if (!filters) {
    return serializedFilters;
  }

  const mustObj = serializedFilters.query.bool.must;
  filters.forEach((filter: Filter) => {
    mustObj.push({
      match: {
        [filter.name]: {
          query: filter.value,
        },
      },
    });
  });

  return serializedFilters;
};

const serializeExactFilters = (filters?: Filter[], serializedFilters: any) => {
  if (!filters) {
    return serializedFilters;
  }

  const mustObj = serializedFilters.query.bool.must;
  filters.forEach((filter: Filter) => {
    mustObj.push({
      term: {
        [filter.name]: filter.value,
      },
    });
  });

  return serializedFilters;
};

const serializeRangeFilters = (filters?: Filter[], serializedFilters: any) => {
  if (!filters) {
    return serializedFilters;
  }

  const mustObj = serializedFilters.query.bool.must;
  filters.forEach((filter: Filter) => {
    mustObj.push({
      range: {
        [filter.name]: {
          gte: filter.getValue()[0],
          lte: filter.getValue()[1],
          time_zone: '+02:00',
        },
      },
    });
  });

  return serializedFilters;
};

const serializeExcludeFilters = (
  filters?: Filter[],
  serializedFilters: any
) => {
  if (!filters) {
    return serializedFilters;
  }

  const boolObj = serializedFilters.query.bool;
  if (filters.length === 1) {
    const filter = filters[0];
    boolObj.must_not = {
      match: {
        [filter.name]: {
          query: filter.value,
        },
      },
    };
  } else {
    boolObj.must_not = filters.map((filter: Filter) => ({
      match: {
        [filter.name]: {
          query: filter.value,
        },
      },
    }));
  }

  return serializedFilters;
};

const serializeFilters = (filters: Filter[]) => {
  let serializedFilters = getDefaultFilter();
  const filterOnTypes: Map<string, Filter[]> = splitFiltersOnTypes(filters);

  serializedFilters = serializeExactFilters(
    filterOnTypes.get(FilterType.EXACT),
    serializedFilters
  );

  serializedFilters = serializeMatchFilters(
    filterOnTypes.get(FilterType.MATCH),
    serializedFilters
  );

  serializedFilters = serializeRangeFilters(
    filterOnTypes.get(FilterType.RANGE),
    serializedFilters
  );

  serializedFilters = serializeExcludeFilters(
    filterOnTypes.get(FilterType.EXCLUDE),
    serializedFilters
  );

  return serializedFilters;
};

export default serializeFilters;
