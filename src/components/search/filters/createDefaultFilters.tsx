import getCurrentDateTime from '../../utils/getCurrentDateTime';
import formatDateTime from '../../utils/formatDateTime';
import FilterCollection from './FilterCollection';
import { FilterType } from './Filter';

const createDefaultFilters = () => {
  const currentDate = getCurrentDateTime();

  const filterCollection = new FilterCollection([]);
  filterCollection.createFilter(
    'coralogix.timestamp',
    FilterType.RANGE,
    [formatDateTime(currentDate), formatDateTime(currentDate)],
    ['From', 'To'],
    false
  );

  filterCollection.createFilter(
    'coralogix.metadata.applicationName',
    FilterType.EXACT,
    'olx-pk-live',
    'App name',
    false
  );

  return filterCollection.getFilters();
};

export default createDefaultFilters;
