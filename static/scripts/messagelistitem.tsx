/// <reference path="typings/main.d.ts" />

interface Props {
  firstmessage: boolean,
  username: string,
  message: string
}

class MessageListItem extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className={this.props.firstmessage ? 'chat-message-first' : 'chat-message'}>
        {this.props.username + ': ' + this.props.message}
      </div>
    );
  }
}

export default MessageListItem;
