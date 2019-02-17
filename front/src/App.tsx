import React, { Component } from 'react';
import { configure } from 'mobx';
import { Helmet } from 'react-helmet';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { locale } from 'moment';
import 'moment/locale/fr';

import { theme } from './theme';
import { RootStore } from './store/rootStore';
import HomePage from './pages/HomePage';

configure({ enforceActions: 'observed' });

locale('fr');

const rootStore = new RootStore();

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Helmet>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
        </Helmet>
        <CssBaseline />
        <HomePage />
      </MuiThemeProvider>
    );
  }
}

export default App;
