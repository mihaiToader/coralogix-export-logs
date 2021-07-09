import { ipcRenderer } from 'electron';
import Listener from './Listener';

class MessageManager {
  listeners: Map<string, Listener> = new Map();

  removeListener(listener: Listener) {
    ipcRenderer.removeListener(listener.channel, listener.callback);
    this.listeners.delete(listener.name);
  }

  registerListener(listener: Listener) {
    const existingListener = this.listeners.get(listener.name);
    if (existingListener) {
      this.removeListener(existingListener);
    }

    this.listeners.set(listener.name, listener);
    ipcRenderer.on(listener.channel, listener.callback);
  }

  sendMessage(channel: string, message: any) {
    ipcRenderer.send(channel, message);
  }
}

const messageManager = new MessageManager();

export default messageManager;
