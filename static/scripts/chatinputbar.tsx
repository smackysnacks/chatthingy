/// <reference path="typings/main.d.ts" />
import ChatSocket from './chatsocket';

interface Props {
  chatsocket: ChatSocket
}

class ChatInputBar extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  onReturnPressed(event) {
    if (event.keyCode == 13) { // <enter key>
      let s = event.target.value.substr(0, 200);
      event.target.value = '';
      this.props.chatsocket.send(s);
    }
  }

  render() {
    return (
      <input type='text' onKeyDown={(event) => this.onReturnPressed(event)} />
    );
  }
}

export default ChatInputBar;
