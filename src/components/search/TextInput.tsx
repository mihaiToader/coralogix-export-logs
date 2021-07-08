import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  container: {
    padding: '10px 20px',
  },
});

const TextInput = () => {
  const styles = useStyles();

  return (
    <Paper className={styles.container}>
      <TextField size="small" label="Next appointment" variant="outlined" />
    </Paper>
  );
};

export default TextInput;
