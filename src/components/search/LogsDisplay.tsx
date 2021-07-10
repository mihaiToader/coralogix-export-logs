import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AnimatedDots from '../animations/AnimatedDots';
import useRegisterListener from '../messages/useRegisterListener';
import Channels from '../../common/channels';
import Listener from '../messages/Listener';
import DownloadState from '../../common/DownloadState';
import ClearLogsDisplay from './filters/ClearLogsDisplay';

const useStyles = makeStyles({
  container: {
    position: 'relative',
    height: '400px',
    padding: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: 'white',
    overflow: 'auto',
    fontFamily: 'Courier',
  },
  error: {
    color: 'red',
  },
  clearButton: {
    position: 'absolute',
    bottom: '-8px',
    right: '-8px',
  },
});

const startLogs: Log[] = [
  {
    message: 'Welcome to this awesome app to download logs!',
    error: false,
  },
  {
    message: 'Warning! May contain bugs! Sorry :(',
    error: true,
  },
];

interface Log {
  message: string;
  error: boolean;
}

const LogsDisplay = () => {
  const styles = useStyles();
  const logsEndRef = React.useRef(null);
  const [logs, setLogs] = React.useState(startLogs);

  const logsListener = (_, log: any) => {
    if (!log.value.length) {
      return;
    }
    setLogs([
      ...logs,
      ...log.value.map((message: string) => ({
        error: log.type === DownloadState.SEND_ERROR_LOG,
        message,
      })),
    ]);
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useRegisterListener(
    new Listener(logsListener, 'LogsDisplay', Channels.DOWNLOAD_LOGS)
  );

  return (
    <Grid item xs={12} style={{ position: 'relative' }}>
      <Paper className={styles.container}>
        {logs.map((log: Log, index: number) => (
          <div
            className={log.error ? styles.error : ''}
            key={index}
          >{`> ${log.message}`}</div>
        ))}
        <div ref={logsEndRef}>
          {'> '}
          <AnimatedDots />
        </div>
      </Paper>
      <div className={styles.clearButton}>
        <ClearLogsDisplay onClick={() => setLogs([])} />
      </div>
    </Grid>
  );
};

export default LogsDisplay;
