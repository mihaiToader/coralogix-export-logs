import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import BackspaceIcon from '@material-ui/icons/Backspace';

const useStyles = makeStyles({
  button: {},
});

const ClearLogsDisplay = ({ onClick }: { onClick: () => void}) => {
  const styles = useStyles();

  return (
    <Button
      variant="contained"
      color="secondary"
      size="small"
      className={styles.button}
      startIcon={<BackspaceIcon />}
      onClick={onClick}
    >
      Clear Logs
    </Button>
  );
};

export default ClearLogsDisplay;
