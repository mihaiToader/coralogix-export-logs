import React from 'react';
import createDefaultFilters from './createDefaultFilters';

const useFilters = () => {
  const [filters, setFilters] = React.useState(createDefaultFilters());

  return filters;
};

export default useFilters;
