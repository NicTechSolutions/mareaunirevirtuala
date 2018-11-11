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

  login() {
    this.props.history.push('/painter')
  }

  render() {
    return (
      <div className="container">
        {this.state.activeTab === LOGIN && (
          <React.Fragment>
            <Login onLogin={this.login} />
            <Text>OR</Text>
            <FacebookLogin onLogin={this.login} />
            <Link handleClick={this.switchTab} text="Create an account" />
          </React.Fragment>
        )}
        {this.state.activeTab === REGISTER && (
          <React.Fragment>
            <Register onRegister={Function.prototype} />
            <Link handleClick={this.switchTab} text="Already have an account?" direction="left" />
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default withRouter(LandingPage);
