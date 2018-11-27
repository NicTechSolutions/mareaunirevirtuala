import React from 'react';
import { withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';

import Login from './Login';
import FacebookLogin from './FacebookLogin';
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

    const token = this.cookies.get('token');
    if(token) {
      this.props.history.push('/counter');
    }

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

  login(userData) {
    this.cookies.set("token", userData.token);
    this.cookies.set("user.has_painting", false);
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
        <div className="logo"></div>
        {this.state.activeTab === LOGIN && (
          <React.Fragment>
            <Login onLogin={this.login} />
            <Link handleClick={this.openForgotPassModal} text="Ai uitat parola?" direction="right" />
            <Link handleClick={this.switchTab} text="Crează un cont" direction="right" />
          </React.Fragment>
        )}
        {this.state.activeTab === REGISTER && (
          <React.Fragment>
            <Register onRegister={this.login} />
            <FacebookLogin onLogin={this.login} />
            <Link handleClick={this.switchTab} text="Ai deja un cont?" direction="right" />
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
