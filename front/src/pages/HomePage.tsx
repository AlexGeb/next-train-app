import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import { IUserStore, Status } from '../store/users';

@inject((allStores: { userStore: IUserStore }) => allStores)
@observer
export class HomePage extends Component<{ userStore?: IUserStore }, any> {
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
            <button key={user._id} onClick={userStore.deleteAll}>
              {user.name}
            </button>
          ))}
        </p>
      </>
    );
  }
}

export default HomePage;
