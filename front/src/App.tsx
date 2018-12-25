import React, { Component } from 'react';
import { globalStyle, createGlobalStyle } from '@smooth-ui/core-sc';
import HomePage from './pages/HomePage';

const GlobalStyle = createGlobalStyle`${globalStyle()}`;

class App extends Component {
  render() {
    return (
      <>
        <GlobalStyle />
        <HomePage />
      </>
    );
  }
}

export default App;
 