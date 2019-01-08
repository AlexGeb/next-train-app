import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { configure } from 'mobx';
import { globalStyle, createGlobalStyle } from '@smooth-ui/core-sc';

import { RootStore } from './store/rootStore';
import HomePage from './pages/HomePage';

configure({ enforceActions: 'observed' });
const GlobalStyle = createGlobalStyle`${globalStyle()}`;

const rootStore = new RootStore();

class App extends Component {
  render() {
    return (
      <Provider {...rootStore}>
        <>
          <GlobalStyle />
          <HomePage />
        </>
      </Provider>
    );
  }
}

export default App;
