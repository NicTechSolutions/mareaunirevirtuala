import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { LandingPage, Painter, ViewerFrame, Counter } from './components';

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
        </Switch>
      </div>
    );
  }
}

export default App;
