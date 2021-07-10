import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import CloseIcon from '@material-ui/icons/Close';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import { Badge } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    position: 'relative',
    padding: '10px 20px',
  },
  close: {
    position: 'absolute',
    top: '0',
    right: '0',
    cursor: 'pointer',
    fill: 'black',
  },
  exclamation: {
    position: 'absolute',
    left: '-6px',
  },
});

type Props = {
  label: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  error?: string | null;
  value?: string | undefined;
  onClose?: (() => void) | null;
  showNotIcon?: boolean;
  onKeyUp?: (event: any) => void;
};

const TextInput = ({
  label,
  defaultValue,
  onChange,
  error,
  value,
  onClose,
  showNotIcon,
  onKeyUp,
}: Props) => {
  const styles = useStyles();

  return (
    <Badge
      color="secondary"
      badgeContent={
        onClose && (
          <CloseIcon
            fontSize="small"
            className={styles.close}
            onClick={onClose}
          />
        )
      }
    >
      <Paper className={styles.container}>
        {showNotIcon && <PriorityHighIcon fontSize="large" className={styles.exclamation} />}
        <TextField
          value={defaultValue ? undefined : value}
          size="small"
          label={label}
          variant="outlined"
          onChange={(event) => onChange(event.target.value)}
          defaultValue={value ? undefined : defaultValue || ''}
          error={!!error}
          helperText={error || ''}
          onKeyUp={onKeyUp}
        />
      </Paper>
    </Badge>
  );
};

export default TextInput;
