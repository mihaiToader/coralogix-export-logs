import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  container: {
    height: '400px',
    padding: '10px',
    backgroundColor: 'rgba(255,255,255,0.3)',
    overflow: 'auto',
  },
});

const hashCode = (s: string) =>
  s.split('').reduce((a: number, b: string) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);

const LogsDisplay = () => {
  const styles = useStyles();
  const [logs, setLogs] = React.useState([
    'Initialise Dpwnload!',
    'Doanloading',
  ]);

  return (
    <Grid item xs={12}>
      <Paper className={styles.container}>
        {logs.map((log: string) => (
          <div key={hashCode(log)}>{log}</div>
        ))}
      </Paper>
    </Grid>
  );
};

export default LogsDisplay;
