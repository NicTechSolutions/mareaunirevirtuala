import React from 'react';
import { withRouter } from 'react-router-dom';

class FacebookLogin extends React.Component {

  componentDidMount() {
    window.fbAsyncInit = function() {
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

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  updateLoggedInState(response) {
    console.log(response);
    this.props.history.push('/painter')
  }

  updateLoggedOutState() {
    console.log('log out')
  }

  render() {
    return (
      <div className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with"
           data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false"></div>
    )
  }
}

export default withRouter(FacebookLogin)
