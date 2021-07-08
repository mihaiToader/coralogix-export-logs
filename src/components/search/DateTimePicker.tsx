import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  container: {
    padding: '10px 20px',
  },
});

const DateTimePicker = () => {
  const styles = useStyles();

  return (
    <Paper className={styles.container}>
      <TextField
        label="Next appointment"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Paper>
  );
};

export default DateTimePicker;
