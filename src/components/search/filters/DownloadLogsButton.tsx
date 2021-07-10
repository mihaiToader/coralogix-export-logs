import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import messageManager from '../../messages/MessageManager';
import Channels from '../../../common/channels';
import Filter from './Filter';
import serializeFilters from './serializeFilters';
import Listener from '../../messages/Listener';
import DownloadStatus from '../../../common/DownloadStatus';
import useRegisterListener from '../../messages/useRegisterListener';

const useStyles = makeStyles({
  button: {
    width: '170px',
    color: 'white',
    backgroundColor: 'green',
  },
  stopButton: {
    marginLeft: '10px',
  },
});

type Props = {
  filters: Filter[];
};

const DownloadLogsButton = ({ filters }: Props) => {
  const styles = useStyles();
  const [downloadStatus, setDownloadStatus] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const firstRequestListener = (_, newDownloadStatus: any) => {
    setDownloadStatus(newDownloadStatus.type);
    setLoading(false);
  };

  const requestsEndListener = () => {
    setLoading(false);
    setDownloadStatus(null);
  };

  useRegisterListener(
    new Listener(
      firstRequestListener,
      'DownloadLogsButton-InitialRequest',
      Channels.MAKE_INITIAL_REQUEST
    )
  );

  useRegisterListener(
    new Listener(
      requestsEndListener,
      'DownloadLogsButton-RequestsEnd',
      Channels.REQUESTS_END
    )
  );

  const onDownload = () => {
    if (loading) {
      return;
    }
    setLoading(true);

    if (downloadStatus === DownloadStatus.FIRST_REQUEST_SUCCESS) {
      messageManager.sendMessage(Channels.TOGGLE_MAKE_REQUEST, true);
      return;
    }

    const serializedFilters = serializeFilters(filters);
    messageManager.sendMessage(
      Channels.MAKE_INITIAL_REQUEST,
      serializedFilters
    );
  };

  const onStop = () => {
    if (downloadStatus === DownloadStatus.FIRST_REQUEST_SUCCESS) {
      if (loading) {
        messageManager.sendMessage(Channels.TOGGLE_MAKE_REQUEST, false);
      } else {
        setDownloadStatus(null);
      }
    }
  };

  const renderButtonText = () => {
    if (loading) {
      return '';
    }
    if (downloadStatus === DownloadStatus.FIRST_REQUEST_SUCCESS) {
      return 'Continue';
    }
    return 'Download logs';
  };

  const renderSecondButtonText = () => {
    if (downloadStatus === DownloadStatus.FIRST_REQUEST_SUCCESS) {
      return 'Stop';
    }
    return null;
  };

  return (
    <>
      <Button
        variant="contained"
        className={styles.button}
        onClick={onDownload}
      >
        {renderButtonText()}
        {loading && <CircularProgress />}
      </Button>
      {renderSecondButtonText() && (
        <Button
          variant="contained"
          color="secondary"
          className={styles.stopButton}
          onClick={onStop}
        >
          {renderSecondButtonText()}
        </Button>
      )}
    </>
  );
};

export default DownloadLogsButton;
