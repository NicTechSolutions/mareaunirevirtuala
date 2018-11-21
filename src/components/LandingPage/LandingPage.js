import React from 'react';
import { withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';

import Login from './Login';
import FacebookLogin from './FacebookLogin';
import Text from '../Text';
import Link from './Link';
import Register from './Register';
import { ForgotPasswordModal } from '../PasswordReset';
import ComplianceModal from '../Compliance';

import './LandingPage.css';

const LOGIN = 'login';
const REGISTER = 'register';

class LandingPage extends React.Component {
  cookies = new Cookies();

  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.switchTab = this.switchTab.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.userGDRPCompliance = this.cookies.get('gdpr_compliance');

    this.state = {
      activeTab: REGISTER,
      modalOpen: this.userGDRPCompliance == null,
    };
  }

  closeModal(accepted) {
    this.setState({
      modalOpen: false,
    })
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
    this.cookies.set("token", token);

    this.props.history.push('/counter');
  }

  openForgotPassModal = () => {
    this.setState({
      openForgotPass: true
    })
  };

  render() {
    return (
      <div className="container">
        <img src={"/logo.png"} className="logo"></img>
        {this.state.activeTab === LOGIN && (
          <React.Fragment>
            <Login onLogin={this.login} />
            <Link handleClick={this.openForgotPassModal} text="Ai uitat parola?" direction="left" />
            <Link handleClick={this.switchTab} text="Creați un cont" />
          </React.Fragment>
        )}
        {this.state.activeTab === REGISTER && (
          <React.Fragment>
            <Register onRegister={this.login} />
            <Text>SAU</Text>
            <FacebookLogin onLogin={this.login} />
            <Link handleClick={this.switchTab} text="Aveți deja un cont?" direction="right" />
          </React.Fragment>
        )}
        {this.state.openForgotPass &&
          <ForgotPasswordModal onClose={Function.prototype} />
        }
        <ComplianceModal open={this.state.modalOpen} onSubmit={this.closeModal} />
      </div>
    )
  }
}

export default withRouter(LandingPage);
