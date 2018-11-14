import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Button from '../../Button';

import './Login.css';

export default class Login extends React.Component {

  static propTypes = {
    onLogin : PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      email    : '',
      password : ''
    };

    this.submit = this.submit.bind(this);
  }

  submit() {
    axios.post('https://ro100.cf/api/users/login', {...this.state})
      .then(res => {
        if (res.status === 200) {
          this.props.onLogin(res.data.token);
        }
      })
      .catch(e => {
        console.log(e)
      });
  }

  render() {
    return (
      <div className="login">
        <input className="input" type="email" placeholder="EMAIL" value={this.state.email} onChange={({target : {value}}) => {
          this.setState({email : value})
        }}/>
        <input className="input" type="password" placeholder="PAROLĂ" value={this.state.password} onChange={({target : {value}}) => {
          this.setState({password : value})
        }}/>
        <Button handleClick={this.submit} buttonText="AUTENTIFICARE"/>
      </div>
    )
  }
}
