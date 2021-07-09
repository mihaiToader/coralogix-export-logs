import Filter, { FilterType } from './Filter';
import RangeFilter from './RangeFilter';
import FilterError from './FilterError';

class FilterCollection {
  filters: Filter[] = [];

  constructor(filters: Filter[]) {
    this.filters = filters;
  }

  createFilter(name: string, type: string, value: any, label: any, removable = true) {
    if (this.getFilter(name)) {
      throw new FilterError('Filter already exists!');
    }
    let filter = null;
    if (type === FilterType.RANGE) {
      filter = new RangeFilter(name, type, value[0], value[1], label || name, removable);
    } else {
      filter = new Filter(name, type, value, label || name, removable);
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

  removeFilter(name: string) {
    const index = this.filters.findIndex((filter: Filter) => filter.name === name);
    if (index > -1) {
      this.filters.splice(index, 1);
    }
  }

  getFilters() {
    return this.filters;
  }
}

export default FilterCollection;
