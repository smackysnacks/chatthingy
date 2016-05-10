/// <reference path="typings/main.d.ts" />

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
      userListItems.push(<li>{user}</li>);
    }

    return (
      <ul>
        {userListItems}
      </ul>
    );
  }
}

export default UserList;
