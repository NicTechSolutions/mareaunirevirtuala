import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { LandingPage, Painter, ViewerFrame, Counter, SettingsPage } from './components';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/painter" component={Painter} />
          <Route exact path="/viewerframe" component={ViewerFrame} />
          <Route exact path="/counter" component={Counter} />
          <Route exact path="/settings" component={SettingsPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
