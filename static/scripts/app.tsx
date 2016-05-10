/// <reference path="typings/main.d.ts" />
import UserList from './userlist';
import ChatSocket from './chatsocket';

ReactDOM.render(
  <div>
    <UserList users={['John', 'Jill', 'Jordan']}></UserList>
  </div>,
  document.getElementById('content')
);

var ws = new ChatSocket('ws://localhost:8080/ws');
