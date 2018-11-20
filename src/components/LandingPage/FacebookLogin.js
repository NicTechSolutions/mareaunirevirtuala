import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Constants from '../../constants/Constants';

import { NotificationManager } from 'react-notifications';


export default class FacebookLogin extends React.Component {

  static propTypes = {
    onLogin: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '1775251435917996',
        cookie: true,
        xfbml: true,
        version: 'v1.0'
      });

      window.FB.Event.subscribe('auth.statusChange', response => {
        if (response.authResponse) {
          this.updateLoggedInState(response)
        }
        else {
          this.updateLoggedOutState()
        }
      })
    }.bind(this);

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  updateLoggedInState(response) {
    console.log(response.authResponse.accessToken);
    axios.post(`${Constants.API_URL}/users/fb/login`, { access_token: response.authResponse.accessToken })
      .then(res => {
        console.log(JSON.stringify(res));
        this.props.onLogin(res.data.token);
      }).catch(err => {
          NotificationManager.error("Nu te putem inregistra cu Facebook");
      });
  }

  updateLoggedOutState() {
    console.log('log out')
  }

  render() {
    return (
      <div className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with"
        data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false"
        data-scope="public_profile, email"></div>
    )
  }
}
