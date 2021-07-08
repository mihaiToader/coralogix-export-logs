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
    [
      formatDateTime({ ...currentDate, hours: currentDate.hours - 1 }),
      formatDateTime({ ...currentDate, hours: currentDate.hours }),
    ],
    ['From', 'To']
  );

  filterCollection.createFilter(
    'coralogix.metadata.applicationName',
    FilterType.EXACT,
    'olx-pk-live',
    'App name'
  );

  return filterCollection.getFilters();
};

export default createDefaultFilters;
