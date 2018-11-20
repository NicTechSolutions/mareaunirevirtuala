import React from 'react';
import { withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function requireAuth(Component) {

  class AuthenticatedHOC extends React.Component {
    componentWillMount() {
      this.checkAuth();
    }

    checkAuth() {
      if ( !cookies.get('token')) {
        this.props.history.push('/landing');
      }
    }

    render() {
      return cookies.get('token')
        ? <Component { ...this.props } />
        : null;
    }
  }

  return withRouter(AuthenticatedHOC);
}
