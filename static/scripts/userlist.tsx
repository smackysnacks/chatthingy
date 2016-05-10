/// <reference path="typings/main.d.ts" />
import UserListItem from './userlistitem';

interface State {
  users: string[]
}

class UserList extends React.Component<{}, State> {
  constructor() {
    super();

    this.state = {users: []};
  }

  render() {
    this.state.users.sort();

    let userListItems = [];
    for (let user of this.state.users) {
      userListItems.push(<UserListItem name={user} />);
    }

    return (
      <ul>
        {userListItems}
      </ul>
    );
  }
}

export default UserList;
