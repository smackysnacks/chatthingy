/// <reference path="typings/main.d.ts" />
import UserList from './userlist';
import MessageList from './messagelist';
import ChatSocket from './chatsocket';

let ws = new ChatSocket('ws://' + window.location.host + '/ws');

ReactDOM.render(
  <div>
    <UserList chatsocket={ws} />
    <MessageList chatsocket={ws} />
  </div>,
  document.getElementById('content')
);

ws.connect();
