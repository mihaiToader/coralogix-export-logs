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

  React.useEffect(() => {
    const listener = new Listener(
      firstRequestListener,
      'DownloadLogsButton',
      Channels.MAKE_INITIAL_REQUEST
    );
    messageManager.registerListener(listener);
    return () => messageManager.removeListener(listener);
  });

  const onDownload = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const serializedFilters = serializeFilters(filters);
    messageManager.sendMessage(
      Channels.MAKE_INITIAL_REQUEST,
      serializedFilters
    );
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
    if (loading) {
      return null;
    }
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
          onClick={onDownload}
        >
          {renderSecondButtonText()}
        </Button>
      )}
    </>
  );
};

export default DownloadLogsButton;
