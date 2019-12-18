import * as React from 'react';
import ChatSocket from './chatsocket';

interface Props {
  chatsocket: ChatSocket;
}

class ChatInputBar extends React.Component<Props, {}> {
  // onReturnPressed(event: React.KeyboardEvent<HTMLInputElement>) {
  onReturnPressed(event: any) {
    if (event.keyCode === 13 && event.target.value.length > 0) { // <enter key>
      let s = event.target.value.substr(0, 200);
      event.target.value = '';
      this.props.chatsocket.send(s);
    }
  }

  render() {
    return (
      <input type="text" onKeyDown={(event) => this.onReturnPressed(event)} />
    );
  }
}

export default ChatInputBar;
