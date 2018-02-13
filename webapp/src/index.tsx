import * as React from 'react';
import * as ReactDOM from 'react-dom';

import UserList from './userlist';
import MessageList from './messagelist';
import ChatInputBar from './chatinputbar';
import ChatSocket from './chatsocket';

let ws = new ChatSocket('ws://' + window.location.host + '/ws');

ReactDOM.render(
  <div className="container">
    <div className="userlist">
      <UserList chatsocket={ws} />
    </div>
    <div className="messages-input">
      <div className="flex-column-container">
        <MessageList chatsocket={ws} />
        <footer className="chatinput">
          <ChatInputBar chatsocket={ws} />
        </footer>
      </div>
    </div>
  </div>,
  document.getElementById('content')
);

ws.connect();
