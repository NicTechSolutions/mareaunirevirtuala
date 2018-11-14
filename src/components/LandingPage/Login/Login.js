import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Modal from 'react-responsive-modal';
import ComplianceModal from '../../Compliance';

import Button from '../../Button';

import './Login.css';

export default class Login extends React.Component {

  static propTypes = {
    onLogin: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loading: false,
      error: null
    };

    this.submit = this.submit.bind(this);
  }

  submit() {
    this.switchLoading();
    axios.post('https://ro100.cf/api/users/login', { ...this.state })
      .then(res => {
        this.switchLoading();
        if (res.status === 200) {
          this.props.onLogin(res.data.token);
        }
      })
      .catch(e => {
        this.switchLoading();
        this.setState({
          error: e.response.data.message,
          email: '',
          password: ''
        });
      });
  }

  switchLoading() {
    this.setState({
      loading: !this.state.loading,
      error: ''
    });
  }

  render() {
    const { loading, error } = this.state;
    return (
      <div className="login">
        {error && <div class="error alert-danger">{error}</div>}
        <input className="input" type="email" placeholder="EMAIL" value={this.state.email} onChange={({ target: { value } }) => {
          this.setState({ email: value })
        }} />
        <input className="input" type="password" placeholder="PAROLĂ" value={this.state.password} onChange={({ target: { value } }) => {
          this.setState({ password: value })
        }} />

        {loading &&
          <div class="loader-container">
            <div class="loader"></div>
          </div>}
        {!loading && < Button handleClick={this.submit} buttonText="AUTENTIFICARE" />}

        <ComplianceModal></ComplianceModal>
      </div>
    )
  }
}
