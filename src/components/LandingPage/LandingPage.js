import React from 'react';
import { withRouter } from 'react-router-dom';

import Login from './Login';
import FacebookLogin from './FacebookLogin';
import Text from '../Text';
import Link from './Link';
import Register from './Register';

import './LandingPage.css';

const LOGIN = 'login';
const REGISTER = 'register';

class LandingPage extends React.Component {

  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.switchTab = this.switchTab.bind(this);
    this.state = {
      activeTab: LOGIN,
    };
  }

  switchTab() {
    if (this.state.activeTab === LOGIN) {
      this.setState({
        activeTab: REGISTER,
      })
    }
    else {
      this.setState({
        activeTab: LOGIN,
      })
    }
  }

  login(token) {
    console.log(token)
    this.props.history.push('/painter');
  }

  render() {
    return (
      <div className="container">
        {this.state.activeTab === LOGIN && (
          <React.Fragment>
            <Login onLogin={this.login} />
            <Text>SAU</Text>
            <FacebookLogin onLogin={this.login} />
            <Link handleClick={this.switchTab} text="Creați un cont" />
          </React.Fragment>
        )}
        {this.state.activeTab === REGISTER && (
          <React.Fragment>
            <Register onRegister={this.login} />
            <Link handleClick={this.switchTab} text="Aveți deja un cont?" direction="left" />
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default withRouter(LandingPage);
