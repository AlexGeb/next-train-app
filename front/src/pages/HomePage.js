import React, { PureComponent } from 'react';
import request from '../services/request';

type PropsType = {};

type StateType = {};

const Layout = ({ children }) => <div>{children}</div>;
const Header = ({ children }) => <div>{children}</div>;
const Body = ({ children }) => <div>{children}</div>;
const Autocomplete = () => <div>Autocomplete</div>;
const DeparturesList = ({ departures }) => (
  <ol>
    {departures.map(({ depTime, from, to }) => (
      <li>{`De ${from} à ${to} à ${depTime}`}</li>
    ))}
  </ol>
);

const departures = [
  { depTime: '12h12', from: 'Paris', to: 'Lyon' },
  { depTime: '12h12', from: 'Paris', to: 'Lyon' },
];
export class HomePage extends PureComponent<PropsType, StateType> {
  componentDidMount() {
    request('users').then(res => console.log(res));
  }

  render() {
    return (
      <Layout>
        <Header>
          <Autocomplete />
        </Header>
        <Body>
          <DeparturesList departures={departures} />
        </Body>
      </Layout>
    );
  }
}

export default HomePage;
