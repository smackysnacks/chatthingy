/// <reference path="typings/main.d.ts" />
import UserList from './userlist';
import ChatSocket from './ws';

ReactDOM.render(
  <div>
    <UserList></UserList>
    <UserList></UserList>
  </div>,
  document.getElementById('content')
);

let ws = new ChatSocket('ws://localhost:8080/ws');
