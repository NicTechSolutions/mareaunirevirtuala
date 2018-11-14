import React from 'react';
import PropTypes from 'prop-types';

const AppContext = React.createContext({
  token: '',
  drawingUrl: '',
  saveToken: () => {},
  saveDrawingUrl: () => {}
});

export default class AppContextProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      token: '',
      drawingUrl: ''
    };
  }

  componentDidMount() {

  }
}
