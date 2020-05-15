import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import theme from './ui/Theme';
import Header from './ui/Header';

import Main from './ui/Pages/Main';
import Scenes from './ui/Pages/Scenes';
import Bridge from './ui/Pages/Bridge';
import Lights from './ui/Pages/Lights';
import Other from './ui/Pages/Other';
import About from './ui/Pages/About';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Header/>
        <Switch>
          <Route exact component={Main} path="/"/>
          <Route exact component={Bridge} path="/bridge"/>
          <Route exact component={Scenes} path="/scenes"/>
          <Route exact component={Lights} path="/lights"/>
          <Route exact component={Other} path="/other"/>
          <Route exact component={About} path="/about"/>
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
