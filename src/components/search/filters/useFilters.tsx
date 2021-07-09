import React from 'react';
import createDefaultFilters from './createDefaultFilters';
import FilterCollection from './FilterCollection';
import FilterError from './FilterError';

const useFilters = () => {
  const [filters, setFilters] = React.useState(createDefaultFilters());

  const addFilter = (name: string, type: string): string | null => {
    const filterCollection = new FilterCollection(filters);
    try {
      filterCollection.createFilter(name, type, '', name);
      setFilters([...filterCollection.getFilters()]);
      return null;
    } catch (e) {
      if (e instanceof FilterError) {
        return e.message;
      }
      throw e;
    }
  };

  const removeFilter = (name: string) => {
    const filterCollection = new FilterCollection(filters);
    filterCollection.removeFilter(name);
    setFilters([...filterCollection.getFilters()]);
  };

  const setFilterValue = (name: string, value: any) => {
    const filterCollection = new FilterCollection(filters);
    filterCollection.setFilterValue(name, value);
    setFilters([...filterCollection.getFilters()]);
  };

  return {
    filters,
    addFilter,
    removeFilter,
    setFilterValue,
  };
};

export default useFilters;
