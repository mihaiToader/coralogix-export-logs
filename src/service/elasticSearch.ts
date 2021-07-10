import { ipcMain } from 'electron';
import axios, { AxiosInstance } from 'axios';

import Channels from '../common/channels';
import DownloadState from "../common/DownloadState";

class ElasticSearch {
  token = '';

  url = 'https://coralogix-esapi.coralogix.com:9443/*/_search';

  client: AxiosInstance | null = null;

  state: any = null;

  getTotalLogs(data: any) {
    return data?.hits?.total?.value || 0;
  }

  parseLogs(data: any) {
    const { hits } = data.hits;
    const nrHits = hits.length;
    const logs: any[] = [];
    hits.forEach((hit: any) => {
      const log = hit._source;
      log.timestamp = `${log.coralogix.timestamp} +02:00`;
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

  initialRequest(event: any) {
    if (!this.client) {
      return;
    }

    console.log(this.state.filters);
    this.client
      .post('', this.state.filters, {
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

        const messages = [
          `Total logs with the given query: ${this.state.totalLogs}`,
          `Logs remaining: ${
            this.state.totalLogs - this.state.logsReceived
          }! Requests remaining: ${this.state.requestsRemaining}!`,
          `Press continue to download them all, or stop to not...`,
        ];
        event.reply(Channels.MAKE_INITIAL_REQUEST, {
          value: messages,
          type: DownloadState.FIRST_REQUEST_SUCCESS,
        });
      })
      .catch(({ data }) => {
        event.reply(Channels.MAKE_INITIAL_REQUEST, {
          value: data,
          type: DownloadState.FIRST_REQUEST_ERROR,
        });
      });
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
        .post('', { size: 1 })
        .then(() => true)
        .catch(() => false);

      event.reply(Channels.SET_TOKEN, succeeded);
    });

    ipcMain.on(Channels.MAKE_INITIAL_REQUEST, async (event, filters) => {
      this.state = {};
      this.state.filters = filters;
      this.initialRequest(event);
    });
  }
}

export default ElasticSearch;
