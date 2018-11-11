import React from 'react';
import PropTypes from 'prop-types';

export default class Text extends React.Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
  };

  render() {
    return (
      <p>{this.props.children}</p>
    )
  }
}
