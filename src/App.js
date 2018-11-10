import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Login, Painter } from './components';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/"  component={Login} />
          <Route exact path="/painter" component={Painter} />
        </Switch>
      </div>
    );
  }
}

export default App;
