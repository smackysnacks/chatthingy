/// <reference path="typings/main.d.ts" />
import UserList from './userlist';
import ChatSocket from './chatsocket';

ReactDOM.render(
  <UserList />,
  document.getElementById('content')
);

var ws = new ChatSocket('ws://localhost:8080/ws');
