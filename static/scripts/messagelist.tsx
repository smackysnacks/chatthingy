/// <reference path="typings/main.d.ts" />
import MessageListItem from './messagelistitem';
import ChatSocket from './chatsocket';

interface Message {
  username: string,
  message: string
}

interface Props {
  chatsocket: ChatSocket
}

interface State {
  messages: Message[]
}

class MessageList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {messages: []};
  }

  onNewMessage(username, message: string) {
    this.state.messages.push({username: username, message: message});
    this.setState(this.state);
  }

  componentDidMount() {
    this.props.chatsocket.addOnNewMessageCallback({
      id: '1',
      f: (username, message: string) => this.onNewMessage(username, message)
    });
  }

  componentWillUnmount() {
    this.props.chatsocket.removeOnNewMessageCallback('1');
  }

  render() {
    let messageListItems = [];
    for (let m of this.state.messages) {
      messageListItems.push(
        <MessageListItem username={m.username} message={m.message} />
      );
    }

    return (
      <div>
        {messageListItems}
      </div>
    );
  }
}

export default MessageList;
