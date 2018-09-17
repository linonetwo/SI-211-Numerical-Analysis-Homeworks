import React, { Component } from 'react';
import { MDXProvider } from '@mdx-js/tag';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Container, Provider as RebassProvider } from 'rebass';
import createComponents from '@rebass/markdown';
import './GlobalStyles';
import Routes from './Routes';

const history = createBrowserHistory();
class App extends Component {
  render() {
    return (
      <MDXProvider components={createComponents()}>
        <RebassProvider>
          <Router history={history}>
            <Container>
              <Routes />
            </Container>
          </Router>
        </RebassProvider>
      </MDXProvider>
    );
  }
}

export default App;
