import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import { LandingPage, Painter, ViewerFrame, Counter, PasswordResetPage, IntroPage } from './components';
import './config/Interceptors';
import requireAuth from './AuthenticatedHOC';
import ReactGA from 'react-ga'


import { PropTypes } from 'prop-types';

class GAListener extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentDidMount() {
    this.sendPageView(this.context.router.history.location);
    this.context.router.history.listen(this.sendPageView);
  }

  sendPageView(location) {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  }

  render() {
    return this.props.children;
  }
}

class App extends Component {
  componentWillMount() {
    ReactGA.set({ page: "/" });
    ReactGA.pageview("/");
  }
  
  render() {
    return (
      <div className="App">
        <NotificationContainer />
        <Switch>
        <GAListener>
          <Route exact path="/" component={IntroPage} />
          <Route exact path="/landing" component={LandingPage} />
          <Route exact path="/painter" component={requireAuth(Painter)} />
          <Route exact path="/mosaic" component={requireAuth(ViewerFrame)} />
          <Route exact path="/counter" component={requireAuth(Counter)} />
          <Route exact path="/reset-pass" component={PasswordResetPage} />
        </GAListener>
        </Switch>
      </div>
    );
  }
}

export default App;
