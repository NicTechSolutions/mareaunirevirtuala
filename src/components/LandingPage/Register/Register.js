import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';

import './Register.css';
import axios from 'axios';

import Constants from '../../../constants/Constants';

export default class Register extends React.Component {
  static propTypes = {
    onRegister: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);

    this.state = {
      name: '',
      email: '',
      password: '',
      loading: false,
      error: '',
    }
  }

  submit() {
    this.switchLoading();
    const data = { 
      name: this.state.name, 
      email: this.state.email, 
      password: this.state.password
    };
    axios.post(`${Constants.API_URL}/users/register`, data)
      .then(res => {
        this.switchLoading();
        if (res.status === 200) {
          this.props.onRegister(res.data);
        }
      })
      .catch(e => {
        this.switchLoading();
        this.setState({
          name: '',
          email: '',
          password: '',
          error: e.response.data.message,
        })
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
      <div className="register">
        {error && <div class="error alert-danger">{error}</div>}
        <input className="input" type="text" placeholder="Nume" value={this.state.name} onChange={({ target: { value } }) => {
          this.setState({ name: value })
        }} />
        <input className="input" type="email" placeholder="Email" value={this.state.email} onChange={({ target: { value } }) => {
          this.setState({ email: value })
        }} />
        <input className="input" type="password" placeholder="Parola" value={this.state.password} onChange={({ target: { value } }) => {
          this.setState({ password: value })
        }} />
        {!loading && <Button handleClick={this.submit} buttonText="ÎNREGISTRARE" />}
        {loading &&
          <div class="loader-container">
            <div class="loader"/>
          </div>}
      </div>
    )
  }
}
