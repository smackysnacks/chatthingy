class ChatSocket {
  socket: WebSocket;

  constructor(websocketUrl: string) {
    this.socket = new WebSocket(websocketUrl);

    this.socket.onopen = function (event) {
      console.log("onopen event: " + event);
    };

    this.socket.onerror = function (event) {
      console.log("onerror event: " + event);
    };

    this.socket.onmessage = function(event) {
      console.log("message is: " + event.data);
    };
  }
}

export default ChatSocket;
