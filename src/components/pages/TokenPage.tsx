import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
import { ipcRenderer } from 'electron';

import Channels from '../../common/channels';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    marginBottom: '20px',
  },
  button: {
    marginTop: '20px',
  },
});

const TokePage = () => {
  const styles = useStyles();
  const history = useHistory();
  const [token, setToken] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const onSearch = () => {
    if (!token || !token.trim()) {
      setError('The token is mandatory!');
      return;
    }
    const succeeded = ipcRenderer.sendSync(Channels.SET_TOKEN, token);
    if (succeeded) {
      setError(null);
      history.push('/search');
    } else {
      setError('Token invalid!');
    }
  };

  return (
    <div className={styles.container}>
      <Card>
        <CardContent className={styles.cardContent}>
          <Typography className={styles.title} variant="h5" component="h3">
            Set your coralogix token:
          </Typography>
          <TextField
            id="outlined-basic"
            label="Coralogix token"
            variant="outlined"
            onChange={(event) => setToken(event.target.value)}
            value={token || ''}
            error={!!error}
            helperText={error || ''}
          />
          <Button
            variant="contained"
            color="primary"
            className={styles.button}
            onClick={onSearch}
          >
            Start searching
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TokePage;