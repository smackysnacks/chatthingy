/// <reference path="typings/main.d.ts" />
import UserList from './userlist';
import ChatSocket from './chatsocket';

let ws = new ChatSocket('ws://' + window.location.host + '/ws');

ReactDOM.render(
  <UserList chatsocket={ws} />,
  document.getElementById('content')
);

ws.connect();
