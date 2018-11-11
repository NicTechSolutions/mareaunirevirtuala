import React from 'react';
import PropTypes from 'prop-types';

export default class Register extends React.Component {
  static propTypes = {
    onRegister: PropTypes.func.isRequired,
  };

  render() {
    return(
      <div>register</div>
    )
  }
}
