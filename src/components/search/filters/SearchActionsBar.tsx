import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';
import TextInput from '../TextInput';
import Filter, { FilterType } from './Filter';
import messageManager from '../../messages/MessageManager';
import Listener from '../../messages/Listener';
import Channels from '../../../common/channels';
import DownloadLogsButton from './DownloadLogsButton';

const useStyles = makeStyles({
  container: {
    flexGrow: 1,
    marginTop: '20px',
    padding: '20px',
    backgroundColor: '#003c8f',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
});

type Props = {
  filters: Filter[];
  addFilter: (name: string, type: string) => string | null;
};

const SearchActionsBar = ({ filters, addFilter }: Props) => {
  const styles = useStyles();
  const [filter, setFilter] = React.useState('');
  const [isPositive, setIsPositive] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const listener = new Listener(
      (_, arg) => console.log(arg),
      'SearchActionsBar',
      Channels.MAKE_INITIAL_REQUEST
    );
    messageManager.registerListener(listener);
    return () => {
      messageManager.removeListener(listener);
    };
  }, []);

  const addNewFilter = () => {
    if (!filter || !filter.trim()) {
      setError('Can not be empty!');
      return;
    }
    const errorMessage = addFilter(
      filter,
      isPositive ? FilterType.MATCH : FilterType.EXCLUDE
    );
    if (errorMessage) {
      setError(errorMessage);
      return;
    }
    setError(null);
    setFilter('');
  };

  return (
    <Paper className={styles.container}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextInput
            label="New filter"
            onChange={(value) => {
              setFilter(value);
              if (error) {
                setError(null);
              }
            }}
            error={error}
            value={filter}
            showNotIcon={!isPositive}
          />
        </Grid>
        <Grid item xs={1} className={styles.buttonContainer}>
          <Tooltip
            title={isPositive ? 'Filter will match' : 'Filter will NOT match'}
          >
            <Switch
              checked={isPositive}
              onChange={(event) => setIsPositive(event.target.checked)}
              name="isPositive"
              color="secondary"
            />
          </Tooltip>
        </Grid>
        <Grid item xs={3} className={styles.buttonContainer}>
          <Button variant="contained" color="primary" onClick={addNewFilter}>
            Add Filter
          </Button>
        </Grid>
        <Grid item xs={3} className={styles.buttonContainer}>
          <DownloadLogsButton filters={filters} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SearchActionsBar;
