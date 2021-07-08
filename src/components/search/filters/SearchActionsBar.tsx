import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextInput from '../TextInput';
import Filter, { FilterType } from './Filter';

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
  addFilter: (name: string, type: string) => void;
};

const SearchActionsBar = ({ filters, addFilter }: Props) => {
  const styles = useStyles();
  const [filter, setFilter] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  const addNewFilter = () => {
    if (!filter || !filter.trim()) {
      setError('Can not be empty!');
      return;
    }
    setError(null);
    addFilter(filter, FilterType.MATCH);
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
          />
        </Grid>
        <Grid item xs={3} className={styles.buttonContainer}>
          <Button variant="contained" color="primary" onClick={addNewFilter}>
            Add Filter
          </Button>
        </Grid>
        <Grid item xs={3} className={styles.buttonContainer}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => console.log(filters)}
          >
            Download logs
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SearchActionsBar;
