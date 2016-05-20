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

  rawMarkup() {
    let m = marked(this.props.message, {sanitize: true});
    m = m.replace(/(<|<\/)p/g, '$1span');

    return { __html: this.props.username + ': ' + m};
  }

  render() {
    return (
      <div
        className={this.props.firstmessage ? 'chat-message-first' : 'chat-message'}
        dangerouslySetInnerHTML={this.rawMarkup()}>
      </div>
    );
  }
}

export default MessageListItem;
