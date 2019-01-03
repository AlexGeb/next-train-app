import React, { PureComponent } from 'react';
import request from '../services/request';

interface User {
  name: string;
  id: string;
}

export class HomePage extends PureComponent {
  state: { users?: Array<User> } = {};

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = () => {
    request('users').then(
      (users: string) => (console.log(users), this.setState({ users })),
    );
  };

  add = () => {
    request('users', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Bob',
      }),
    }).then(users => this.fetchUsers());
  };

  deleteAll = () => {
    request('users', {
      method: 'DELETE',
    }).then(users => this.fetchUsers());
  };

  delete = (id: string) => () => {
    request(`users/${id}`, {
      method: 'DELETE',
    }).then(users => this.fetchUsers());
  };

  render() {
    const { users } = this.state;
    console.log(users);

    return (
      <>
        <div>
          <button onClick={this.add}>add</button>
          <button onClick={this.deleteAll}>delete</button>
        </div>
        <p>
          {users &&
            users.map(user => (
              <button key={user.id} onClick={this.delete(user.id)}>
                {user.name}
              </button>
            ))}
        </p>
      </>
    );
  }
}

export default HomePage;
