import * as React from 'react';

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
  private container: HTMLDivElement | null = null;
  constructor(props: Props) {
    super(props);

    this.state = {messages: []};
  }

  onNewMessage(username: string, message: string) {
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
    if (this.container) {
      this.container.scrollTop = this.container.scrollHeight;
    }
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
      <div className="messages" ref={(container) => this.container = container}>
        {messageListItems}
      </div>
    );
  }
}

export default MessageList;
