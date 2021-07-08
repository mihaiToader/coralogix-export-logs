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
  defaultValue?: string;
  onChange: (value: string) => void;
  error?: string | null;
};

const TextInput = ({ label, defaultValue, onChange, error }: Props) => {
  const styles = useStyles();

  return (
    <Paper className={styles.container}>
      <TextField
        size="small"
        label={label}
        variant="outlined"
        onChange={(event) => onChange(event.target.value)}
        defaultValue={defaultValue || ''}
        error={!!error}
        helperText={error || ''}
      />
    </Paper>
  );
};

export default TextInput;
