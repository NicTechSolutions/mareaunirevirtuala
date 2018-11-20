import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import { LandingPage, Painter, ViewerFrame, Counter, PasswordResetPage, IntroPage } from './components';
import './config/Interceptors';
import requireAuth from './AuthenticatedHOC';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NotificationContainer />
        <Switch>
          <Route exact path="/" component={IntroPage} />
          <Route exact path="/landing" component={LandingPage} />
          <Route exact path="/painter" component={requireAuth(Painter)} />
          <Route exact path="/viewerframe" component={requireAuth(ViewerFrame)} />
          <Route exact path="/counter" component={requireAuth(Counter)} />
          <Route exact path="/reset-pass" component={requireAuth(PasswordResetPage)} />
        </Switch>
      </div>
    );
  }
}

export default App;
