import * as React from 'react';

import UserListItem from './userlistitem';
import ChatSocket from './chatsocket';

interface Props {
  chatsocket: ChatSocket;
}

interface State {
  users: string[];
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
    this.props.chatsocket.addOnUserJoinCallback({
      id: '1',
      f: (username: string) => this.onUserJoin(username)
    });

    this.props.chatsocket.addOnUserLeaveCallback({
      id: '1',
      f: (username: string) => this.onUserLeave(username)
    });
  }

  componentWillUnmount() {
    this.props.chatsocket.removeOnUserJoinCallback('1');
    this.props.chatsocket.removeOnUserLeaveCallback('1');
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
