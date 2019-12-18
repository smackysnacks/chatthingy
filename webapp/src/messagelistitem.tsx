import * as React from 'react';
import marked from 'marked';

interface Props {
  firstmessage: boolean;
  username: string;
  message: string;
}

class MessageListItem extends React.Component<Props, {}> {
  rawMarkup() {
    let m = marked(this.props.message, {sanitize: true});
    m = m.replace(/(<|<\/)p/g, '$1span');

    return { __html: this.props.username + ': ' + m};
  }

  render() {
    return (
      <div
        className={this.props.firstmessage ? 'chat-message-first' : 'chat-message'}
        dangerouslySetInnerHTML={this.rawMarkup()}
      />
    );
  }
}

export default MessageListItem;
