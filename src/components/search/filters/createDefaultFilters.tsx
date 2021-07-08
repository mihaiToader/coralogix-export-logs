import getCurrentDateTime from '../../utils/getCurrentDateTime';
import formatDateTime from '../../utils/formatDateTime';

const createDefaultFilters = () => {
  const currentDate = getCurrentDateTime();

  return {
    query: {
      bool: {
        must: [
          {
            term: {
              'coralogix.metadata.applicationName': 'olx-pk-live',
            },
          },
          {
            range: {
              'coralogix.timestamp': {
                gte: formatDateTime({
                  ...currentDate,
                  hours: currentDate.hours - 1,
                }),
                lte: formatDateTime(currentDate),
                time_zone: '+02:00',
              },
            },
          },
        ],
      },
    },
    sort: [{ 'coralogix.timestamp': { order: 'desc' } }],
    size: 1,
  };
};

export default createDefaultFilters;
