import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  container: {
    padding: '10px 20px',
  },
});

type Props = {
  label: string;
  defaultValue: string;
  onChange: (value: string) => void;
};

const DateTimePicker = ({ label, defaultValue, onChange }: Props) => {
  const styles = useStyles();

  return (
    <Paper className={styles.container}>
      <TextField
        label={label}
        type="datetime-local"
        defaultValue={defaultValue}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(event) => onChange(event.target.value)}
      />
    </Paper>
  );
};

export default DateTimePicker;
