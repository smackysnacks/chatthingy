/// <reference path="typings/main.d.ts" />

interface Props {
  users: string[]
}

class UserList extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    this.props.users.sort();

    let userListItems = [];
    for (let user of this.props.users) {
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
