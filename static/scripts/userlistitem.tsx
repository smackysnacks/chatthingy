/// <reference path="typings/index.d.ts" />

interface Props {
  name: string
}

class UserListItem extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <li>{this.props.name}</li>
    );
  }
}

export default UserListItem;
