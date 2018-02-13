import * as React from 'react';
import * as ReactDOM from 'react-dom';

import MessageListItem from './messagelistitem';
import ChatSocket from './chatsocket';

interface Message {
  username: string;
  message: string;
}

interface Props {
  chatsocket: ChatSocket;
}

interface State {
  messages: Message[];
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

  componentDidUpdate() {
    // scroll to bottom of messages
    let node = ReactDOM.findDOMNode(this);
    node.scrollTop = node.scrollHeight;
  }

  render() {
    let firstMessage = true;
    let messageListItems = [];
    for (let m of this.state.messages) {
      messageListItems.push(
        <MessageListItem firstmessage={firstMessage} username={m.username} message={m.message} />
      );
      firstMessage = false;
    }

    return (
      <div className="messages">
        {messageListItems}
      </div>
    );
  }
}

export default MessageList;
