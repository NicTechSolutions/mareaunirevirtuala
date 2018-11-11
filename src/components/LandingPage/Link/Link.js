import React from 'react';
import PropTypes from 'prop-types';

export default class Link extends React.Component {

  static propTypes = {
    handleClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
  };

  render() {
    return(
      <span onClick={this.props.handleClick}>{this.props.text}</span>
    )
  }
}
