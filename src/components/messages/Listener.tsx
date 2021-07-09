class Listener {
  callback: any;

  name: string;

  channel: string;

  constructor(callback: any, name: string, channel: string) {
    this.callback = callback;
    this.name = name;
    this.channel = channel;
  }
}

export default Listener;
