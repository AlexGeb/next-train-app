import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import { Status } from '../enums';
import SearchStations from '../components/SearchStations';

@inject((rootStore: IRootStore) => ({ userStore: rootStore.userStore }))
@observer
export class HomePage extends Component<{ userStore?: IUserStore }, any> {
  constructor(props: any) {
    super(props);
    console.log(props);
  }

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
          <SearchStations />
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

export default HomePage;
