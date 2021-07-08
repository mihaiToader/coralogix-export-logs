import React from 'react';
import createDefaultFilters from './createDefaultFilters';
import FilterCollection from "./FilterCollection";

const useFilters = () => {
  const [filters, setFilters] = React.useState(createDefaultFilters());

  const addFilter = (name: string, type: string) => {
    const filterCollection = new FilterCollection(filters);
    filterCollection.createFilter(name, type, '', name);
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
    setFilterValue,
  };
};

export default useFilters;
