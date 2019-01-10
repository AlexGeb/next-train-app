import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import { Status } from '../enums';

@inject((rootStore: IRootStore) => ({ userStore: rootStore.userStore }))
@observer
export class UserList extends Component<{ userStore?: IUserStore }, any> {
  render() {
    const { userStore } = this.props;
    if (!userStore) return null;
    if (userStore.status === Status.PENDING) return <div>loading...</div>;
    if (userStore.status === Status.ERROR) return <div>error</div>;

    return (
      <>
        <div>
          <button onClick={userStore.addUser}>add</button>
          <button onClick={userStore.deleteAll}>delete</button>
        </div>
        <p>
          {userStore.users.map(user => (
            <button
              key={user._id}
              onClick={() => userStore.deleteOne(user._id)}
            >
              {user.name}
            </button>
          ))}
        </p>
      </>
    );
  }
}

export default UserList;
