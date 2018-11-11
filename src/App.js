import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { FacebookLogin, Painter, Viewer } from './components';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/"  component={FacebookLogin} />
          <Route exact path="/painter" component={Painter} />
          <Route exact path="/viewer" component={Viewer} />
        </Switch>
      </div>
    );
  }
}

export default App;