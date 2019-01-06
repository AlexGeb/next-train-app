import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { configure } from 'mobx';
import { globalStyle, createGlobalStyle } from '@smooth-ui/core-sc';

import { userStore } from './store/users';
import HomePage from './pages/HomePage';

configure({ enforceActions: 'observed' });
const GlobalStyle = createGlobalStyle`${globalStyle()}`;

class App extends Component {
  render() {
    return (
      <Provider userStore={userStore}>
        <>
          <GlobalStyle />
          <HomePage />
        </>
      </Provider>
    );
  }
}

export default App;
