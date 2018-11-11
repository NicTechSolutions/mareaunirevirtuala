import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

export default class Button extends React.Component {
  static propTypes = {
    handleClick: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired,
  };

  render() {
    return(
      <button className="button" type="button" onClick={this.props.handleClick}>{this.props.buttonText}</button>
    );
  }
}
