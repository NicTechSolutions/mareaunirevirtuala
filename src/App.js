import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { LandingPage, Painter, ViewerFrame, Counter, PasswordResetPage } from './components';
import AppContextProvider from './AppContextProvider';

import './config/Interceptors';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppContextProvider>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/painter" component={Painter} />
            <Route exact path="/viewerframe" component={ViewerFrame} />
            <Route exact path="/counter" component={Counter} />
            <Route exact path="/reset-pass" component={PasswordResetPage} />
          </Switch>
        </AppContextProvider>
      </div>
    );
  }
}

export default App;
