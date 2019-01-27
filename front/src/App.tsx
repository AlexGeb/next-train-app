import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { configure } from 'mobx';
import { Helmet } from 'react-helmet';
import CssBaseline from '@material-ui/core/CssBaseline';
import { locale } from 'moment';
import 'moment/locale/fr';

import { RootStore } from './store/rootStore';
import HomePage from './pages/HomePage';

configure({ enforceActions: 'observed' });

locale('fr');

const rootStore = new RootStore();

class App extends Component {
  render() {
    return (
      <>
        <Helmet>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
        </Helmet>
        <CssBaseline />
        <Provider {...rootStore}>
          <HomePage />
        </Provider>
      </>
    );
  }
}

export default App;
