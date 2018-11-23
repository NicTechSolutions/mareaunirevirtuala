import React from 'react';
import PropTypes from 'prop-types';

import './Link.css';

export default class Link extends React.Component {

  static propTypes = {
    handleClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    direction: PropTypes.string,
  };

  static defaultProps = {
    direction: ''
  };

  render() {
    return (
      <span className={"link " + this.props.direction} onClick={this.props.handleClick}><p>{this.props.text}</p></span>
    )
  }
}
