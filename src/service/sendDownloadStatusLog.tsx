import Channels from '../common/channels';
import DownloadStatus from '../common/DownloadStatus';

const sendDownloadStatusLog = (event: any, log: string[], error = false) => {
  if (error) {
    event.reply(Channels.DOWNLOAD_LOGS, {
      value: log,
      type: DownloadStatus.SEND_ERROR_LOG,
    });
    return;
  }
  event.reply(Channels.DOWNLOAD_LOGS, {
    value: log,
    type: DownloadStatus.SEND_LOG,
  });
};

const messages: any[] = [];

const scheduleDownloadStatusMessage = (log: string[], error = false) => {
  if (error) {
    messages.push({
      value: log,
      type: DownloadStatus.SEND_ERROR_LOG,
    });
    return;
  }
  messages.push({
    value: log,
    type: DownloadStatus.SEND_LOG,
  });
};

const flushDownloadStatusMessages = (event: any) => {
  event.reply(Channels.DOWNLOAD_LOGS, messages);
  messages.splice(0, messages.length);
};

export { scheduleDownloadStatusMessage, flushDownloadStatusMessages };

export default sendDownloadStatusLog;
