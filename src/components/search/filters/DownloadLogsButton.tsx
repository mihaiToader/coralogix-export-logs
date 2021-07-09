import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import messageManager from '../../messages/MessageManager';
import Channels from '../../../common/channels';
import Filter from './Filter';
import serializeFilters from './serializeFilters';
import Listener from '../../messages/Listener';
import DownloadState from '../../../common/DownloadState';

const useStyles = makeStyles({
  button: {
    width: '170px',
  },
});

type Props = {
  filters: Filter[];
};

const DownloadLogsButton = ({ filters }: Props) => {
  const styles = useStyles();
  const [firstDownloadSuccess, setFirstDownload] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const firstRequestListener = (_, downloadState: any) => {
    if (downloadState.type === DownloadState.FIRST_REQUEST_ERROR) {
      setFirstDownload(false);
    } else {
      setFirstDownload(true);
    }
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
    if (firstDownloadSuccess) {
      return 'Continue';
    }
    return 'Download logs';
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      className={styles.button}
      onClick={onDownload}
    >
      {renderButtonText()}
      {loading && <CircularProgress />}
    </Button>
  );
};

export default DownloadLogsButton;
