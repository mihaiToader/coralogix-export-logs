import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import Channels from '../../common/channels';
import Footer from '../footer/Footer';
import Listener from '../messages/Listener';
import messageManager from '../messages/MessageManager';
import useRegisterListener from '../messages/useRegisterListener';

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
  const [token, setToken] = React.useState<string | null>(
    '16a5f025-cccb-2bfa-bc91-ccb6d528b78e'
  );
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const setTokenListener = (_, succeeded: boolean) => {
    setLoading(false);
    if (succeeded) {
      setError(null);
      history.push('/search');
    } else {
      setError('Token invalid!');
    }
  };

  useRegisterListener(
    new Listener(setTokenListener, 'TokePage', Channels.SET_TOKEN)
  );

  const onSearch = () => {
    if (loading) {
      return;
    }
    if (!token || !token.trim()) {
      setError('The token is mandatory!');
      return;
    }
    setLoading(true);
    messageManager.sendMessage(Channels.SET_TOKEN, token);
  };

  return (
    <>
      <div className={styles.container}>
        <Card>
          <CardContent className={styles.cardContent}>
            <Typography className={styles.title} variant="h5" component="h3">
              Set your coralogix token:
            </Typography>
            <TextField
              label="Coralogix token"
              variant="outlined"
              onChange={(event) => {
                if (error) {
                  setError(null);
                }
                setToken(event.target.value);
              }}
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
              {!loading && <span>Start searching</span>}
              {loading && (
                <CircularProgress
                  style={{ width: '24px', height: '24px' }}
                  color="secondary"
                />
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default TokePage;
