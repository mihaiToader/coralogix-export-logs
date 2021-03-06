import { ipcMain, app } from 'electron';
import axios, { AxiosInstance } from 'axios';

import Channels from '../common/channels';
import DownloadStatus from '../common/DownloadStatus';
import WriteLogsToFile from './WriteLogsToFile';
import sendDownloadStatusLog, {
  flushDownloadStatusMessages,
  scheduleDownloadStatusMessage,
} from './sendDownloadStatusLog';

class DownloadLogsService {
  token = '';

  url = 'https://coralogix-esapi.coralogix.com:9443';

  client: AxiosInstance | null = null;

  state: any = null;

  writeService: WriteLogsToFile;

  constructor() {
    this.writeService = new WriteLogsToFile(app.getPath('desktop'));
  }

  getTotalLogs(data: any) {
    return data?.hits?.total?.value || 0;
  }

  parseLogs(data: any) {
    const { hits } = data.hits;
    const nrHits = hits.length;
    const logs: any[] = [];
    hits.forEach((hit: any) => {
      const log = hit._source;
      log.timestamp = `${log.coralogix.timestamp} +03:00`;
      log.applicationName = log.coralogix.metadata.applicationName;
      delete log.coralogix;
      logs.push(log);
    });
    return {
      nrHits,
      logs,
    };
  }

  getPayload(data: any) {
    const scrollID = data._scroll_id;
    return {
      scroll: '6m',
      scroll_id: scrollID,
    };
  }

  async initialRequest(event: any) {
    if (!this.client) {
      return;
    }
    sendDownloadStatusLog(event, [
      '',
      'Making initial request to coralogix',
      'Might take a while...',
    ]);
    const resultLogs = await this.client
      .post('/*/_search', this.state.filters, {
        params: {
          scroll: '5m',
        },
      })
      .then(({ data }) => {
        this.state.totalLogs = this.getTotalLogs(data);
        const { nrHits, logs } = this.parseLogs(data);
        this.state.logsReceived = nrHits;
        this.state.requestsRemaining = Math.floor(this.state.totalLogs / 5000);
        this.state.payload = this.getPayload(data);
        if (this.state.totalLogs === 0) {
          scheduleDownloadStatusMessage([
            `Total logs with the given query: ${this.state.totalLogs}`,
            `Sorry there are no logs for your filters!`,
          ]);
          event.reply(Channels.MAKE_INITIAL_REQUEST, {
            value: null,
            type: DownloadStatus.FIRST_REQUEST_NO_HITS,
          });
          return null;
        }
        if (this.state.requestsRemaining === 0) {
          scheduleDownloadStatusMessage([
            `Total logs with the given query: ${this.state.totalLogs}`,
            `We got all logs with the first request!`,
          ]);
        } else {
          scheduleDownloadStatusMessage([
            `Total logs with the given query: ${this.state.totalLogs}`,
            `Logs remaining: ${this.state.totalLogs - this.state.logsReceived}`,
            `Requests remaining: ${this.state.requestsRemaining}!`,
          ]);
        }
        return logs;
      })
      .catch(() => {
        scheduleDownloadStatusMessage(
          [
            'Initial request to coralogix failed!',
            'Maybe close and reopen the app or change filters :(',
            'And if that is not working go yell at Mihai :D',
          ],
          true
        );
        event.reply(Channels.MAKE_INITIAL_REQUEST, {
          value: null,
          type: DownloadStatus.FIRST_REQUEST_ERROR,
        });
        return null;
      });

    if (!resultLogs) {
      flushDownloadStatusMessages(event);
      return;
    }

    await this.writeService.writeJsonToFile(event, resultLogs);
    if (this.state.requestsRemaining === 0) {
      scheduleDownloadStatusMessage([`All logs were saved!`]);
    } else {
      scheduleDownloadStatusMessage([
        'Press continue to download them all, or stop to not',
      ]);
    }

    flushDownloadStatusMessages(event);
    if (this.state.requestsRemaining === 0) {
      event.reply(Channels.MAKE_INITIAL_REQUEST, {
        value: null,
        type: DownloadStatus.FIRST_REQUEST_ALL_HITS,
      });
      return;
    }

    event.reply(Channels.MAKE_INITIAL_REQUEST, {
      value: null,
      type: DownloadStatus.FIRST_REQUEST_SUCCESS,
    });
  }

  async makeNextRequests(event: any) {
    if (!this.state.filters || !this.client) {
      return;
    }

    while (true) {
      if (this.state.stopRequests) {
        sendDownloadStatusLog(event, ['Requests stopped!'], true);
        break;
      }

      const response = await this.client
        .post('/_search/scroll', this.state.payload)
        .then(({ data }) => data)
        .catch(() => {
          return null;
        });

      if (!response) {
        sendDownloadStatusLog(
          event,
          ['Something went wrong!', 'God dammit!'],
          true
        );
        break;
      }

      const { nrHits, logs } = this.parseLogs(response);
      if (nrHits === 0) {
        break;
      }
      this.state.logsReceived += nrHits;
      this.state.requestsRemaining -= 1;
      sendDownloadStatusLog(event, [
        `Logs remaining: ${this.state.totalLogs - this.state.logsReceived}`,
        `Requests remaining: ${this.state.requestsRemaining}`,
      ]);
      await this.writeService.writeJsonToFile(event, logs);
      flushDownloadStatusMessages(event);
    }

    event.reply(Channels.REQUESTS_END, {
      value: null,
      type: DownloadStatus.REQUESTS_END,
    });
    sendDownloadStatusLog(event, [`Finished!`]);
  }

  setupChannels() {
    ipcMain.on(Channels.SET_TOKEN, async (event, token) => {
      this.token = token;
      this.client = axios.create({
        baseURL: this.url,
        timeout: 100000,
        headers: { token: this.token, 'Content-Type': 'application/json' },
      });
      const succeeded = await this.client
        .post('/*/_search', { size: 1 })
        .then(() => true)
        .catch(() => false);

      event.reply(Channels.SET_TOKEN, succeeded);
    });

    ipcMain.on(Channels.MAKE_INITIAL_REQUEST, async (event, filters) => {
      this.state = {};
      this.state.filters = filters;
      this.writeService.setFileName();
      await this.initialRequest(event);
    });

    ipcMain.on(Channels.TOGGLE_MAKE_REQUEST, async (event, toggle) => {
      if (toggle) {
        sendDownloadStatusLog(event, ['Starting to make the next requests:']);
        await this.makeNextRequests(event);
      } else {
        this.state.stopRequests = true;
        sendDownloadStatusLog(event, ['Stop set, waiting for last request!']);
      }
    });
  }
}

export default DownloadLogsService;
