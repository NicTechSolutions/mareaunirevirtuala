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

    this.saveToken = this.saveToken.bind(this);
    this.saveDrawingUrl = this.saveDrawingUrl.bind(this);

    this.state = {
      token: '',
      drawingUrl: ''
    };
  }

  saveToken(token) {
    this.setState({token})
  }

  saveDrawingUrl(drawingUrl) {
    this.setState({drawingUrl})
  }

  render() {
    return(
      <AppContext.Provider value={{
        saveToken: this.saveToken,
        saveDrawingUrl: this.saveDrawingUrl,
        ...this.state,
      }}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export const AppContextConsumer = props => (
  <AppContext.Consumer>{props.children}</AppContext.Consumer>
);

AppContextConsumer.propTypes = {
  children: PropTypes.func.isRequired,
};
