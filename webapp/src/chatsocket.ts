interface OnUserJoinCallback {
  id: string;
  f: (username: string) => void;
}

interface OnUserLeaveCallback {
  id: string;
  f: (username: string) => void;
}

interface OnNewMessageCallback {
  id: string;
  f: (username, message: string) => void;
}

class ChatSocket {
  private websocketUrl: string;
  private socket: WebSocket;
  private onUserJoinCallbacks: OnUserJoinCallback[];
  private onUserLeaveCallbacks: OnUserLeaveCallback[];
  private onNewMessageCallbacks: OnNewMessageCallback[];

  constructor(websocketUrl: string) {
    this.websocketUrl = websocketUrl;

    this.onUserJoinCallbacks = [];
    this.onUserLeaveCallbacks = [];
    this.onNewMessageCallbacks = [];
  }

  public connect() {
    this.socket = new WebSocket(this.websocketUrl);

    this.socket.onopen = (event) => this.onOpen(event);
    this.socket.onerror = (event) => this.onError(event);
    this.socket.onmessage = (event) => this.onMessage(event);
    this.socket.onclose = (event) => this.onClose(event);
  }

  public disconnect() {
    this.onUserJoinCallbacks = [];
    this.onUserLeaveCallbacks = [];
    this.onNewMessageCallbacks = [];

    this.socket.close();
  }

  public send(message: string) {
    this.socket.send(message);
  }

  //
  // Callbacks
  //
  public addOnUserJoinCallback(callback: OnUserJoinCallback) {
    this.onUserJoinCallbacks.push(callback);
  }

  public removeOnUserJoinCallback(id: string) {
    let length = this.onUserJoinCallbacks.length;
    this.onUserJoinCallbacks = this.onUserJoinCallbacks.filter(cb => cb.id !== id);
    return length - this.onUserJoinCallbacks.length;
  }

  public addOnUserLeaveCallback(callback: OnUserJoinCallback) {
    this.onUserLeaveCallbacks.push(callback);
  }

  public removeOnUserLeaveCallback(id: string): number {
    let length = this.onUserLeaveCallbacks.length;
    this.onUserLeaveCallbacks = this.onUserLeaveCallbacks.filter(cb => cb.id !== id);
    return length - this.onUserLeaveCallbacks.length;
  }

  public addOnNewMessageCallback(callback: OnNewMessageCallback) {
    this.onNewMessageCallbacks.push(callback);
  }

  public removeOnNewMessageCallback(id: string): number {
    let length = this.onNewMessageCallbacks.length;
    this.onNewMessageCallbacks = this.onNewMessageCallbacks.filter(cb => cb.id !== id);
    return length - this.onNewMessageCallbacks.length;
  }
  //
  // End Callbacks
  //

  private onOpen(event) {
  }

  private onError(event) {
  }

  private onMessage(event: MessageEvent) {
    let json = JSON.parse(event.data);

    if (json.type === 'join') {
      for (let callback of this.onUserJoinCallbacks) {
        callback.f(json.data);
      }
    } else if (json.type === 'leave') {
      for (let callback of this.onUserLeaveCallbacks) {
        callback.f(json.data);
      }
    } else if (json.type === 'message') {
      for (let callback of this.onNewMessageCallbacks) {
        callback.f(json.data.user, json.data.message);
      }
    }
  }

  private onClose(event: CloseEvent) {
  }
}

export default ChatSocket;
