import { ipcMain } from 'electron';
import axios, { AxiosInstance } from 'axios';

import Channels from '../common/channels';

class ElasticSearch {
  token = '';

  url = 'https://coralogix-esapi.coralogix.com:9443/*/_search';

  client: AxiosInstance | null = null;

  setupChannels() {
    ipcMain.on(Channels.SET_TOKEN, async (event, token) => {
      this.token = token;
      this.client = axios.create({
        baseURL: this.url,
        timeout: 1000,
        headers: { token: this.token, 'Content-Type': 'application/json' },
      });
      event.returnValue = await this.client
        .post('', { size: 1 })
        .then(() => true)
        .catch(() => false);
    });
  }
}

export default ElasticSearch;
