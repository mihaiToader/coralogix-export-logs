import Filter, { FilterType } from './Filter';
import RangeFilter from './RangeFilter';

class FilterCollection {
  filters: Filter[] = [];

  constructor(filters: Filter[]) {
    this.filters = filters;
  }

  createFilter(name: string, type: string, value: any, label: any) {
    let filter = null;
    if (type === FilterType.RANGE) {
      filter = new RangeFilter(name, type, value[0], value[1], label || name);
    } else {
      filter = new Filter(name, type, value, label || name);
    }
    this.filters.push(filter);
    return filter;
  }

  getFilter(name: string) {
    return this.filters.find((filter: Filter) => filter.name === name);
  }

  getFilterValue(name: string) {
    const filter = this.getFilter(name);
    if (filter) {
      return filter.getValue();
    }
    return null;
  }

  setFilterValue(name: string, value: any) {
    const filter = this.getFilter(name);
    if (filter) {
      filter.setValue(value);
    }
  }

  getFilters() {
    return this.filters;
  }
}

export default FilterCollection;
