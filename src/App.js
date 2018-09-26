import React, { Component } from 'react';
import { MDXProvider } from '@mdx-js/tag';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Container, Provider as RebassProvider } from 'rebass';
import createComponents from '@rebass/markdown';
import './GlobalStyles';
import Routes from './Routes';

const history = createMemoryHistory();
class App extends Component {
  render() {
    return (
      <MDXProvider components={createComponents()}>
        <RebassProvider>
          <MemoryRouter history={history}>
            <Container>
              <Routes />
            </Container>
          </MemoryRouter>
        </RebassProvider>
      </MDXProvider>
    );
  }
}

export default App;
