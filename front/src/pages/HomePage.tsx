import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import SearchStations from '../components/SearchStations';
import { IUserStore, Status } from '../store/users';
import { ISearchStationStore } from '../store/searchStation';

@inject('userStore', 'searchStationStore')
@observer
export class HomePage extends Component<
  { userStore?: IUserStore; searchStationStore?: ISearchStationStore },
  any
> {
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
          <SearchStations searchStationStore={this.props.searchStationStore} />
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
