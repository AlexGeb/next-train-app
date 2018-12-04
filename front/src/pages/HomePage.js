import React, { PureComponent } from 'react';
import request from '../services/request';

type PropsType = {};

type StateType = {};

const Layout = ({ children }) => <div>{children}</div>;
const Header = ({ children }) => <div>{children}</div>;
const Body = ({ children }) => <div>{children}</div>;
const Autocomplete = () => <div>Autocomplete</div>;

export class HomePage extends PureComponent<PropsType, StateType> {
  state = {};

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = () => {
    request('users').then(users => this.setState({ users: JSON.parse(users) }));
  };

  add = () => {
    request('users', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Bob',
      }),
    }).then(users => this.fetchUsers());
  };

  render() {
    const { users } = this.state;
    return (
      <Layout>
        <Header>
          <Autocomplete />
        </Header>
        <Body>{users && users.map(user => user.name)}</Body>
        <button onClick={this.add}>add</button>
      </Layout>
    );
  }
}

export default HomePage;
