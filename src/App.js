import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import { LandingPage, Painter, ViewerFrame, Counter, SettingsModal, PasswordResetPage } from './components';

import './config/Interceptors';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NotificationContainer />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/painter" component={Painter} />
          <Route exact path="/viewerframe" component={ViewerFrame} />
          <Route exact path="/counter" component={Counter} />
          <Route exact path="/settings" component={SettingsModal} />
          <Route exact path="/reset-pass" component={PasswordResetPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
