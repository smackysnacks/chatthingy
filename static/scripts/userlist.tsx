/// <reference path="typings/main.d.ts" />
import UserListItem from './userlistitem';
import ChatSocket from './chatsocket';

interface Props {
  chatsocket: ChatSocket
}

interface State {
  users: string[]
}

class UserList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {users: []};
  }

  onUserJoin(username: string) {
    var newUsers = this.state.users.concat(username);
    this.setState({users: newUsers});
  }

  onUserLeave(username: string) {
    var newUsers = this.state.users.filter(function(user) {
      return user !== username;
    });
    this.setState({users: newUsers});
  }

  componentDidMount() {
    // TODO: setup event handlers from ChatSocket
    // such as joins and leaves
  }

  componentWillUnmount() {
    // TODO: tear down event handlers that were
    // registered in componentDidMount()
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
