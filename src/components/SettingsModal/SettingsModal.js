import React from 'react';
import Modal from 'react-responsive-modal';
import axios from 'axios';
import PropTypes from 'prop-types';

import "./SettingsModal.css";

import Constants from '../../constants/Constants';

export default class SettingsModal extends React.Component {

  static propTypes = {
    open: PropTypes.bool,
    close: PropTypes.func,
  };

  static defaultProps = {
    open: false,
    close: Function.prototype,
  };

  constructor(props) {
    super(props);

    this.state = {
      showPrompt : false,
    }
  };

  toggleConfirmPrompt = () => {
    this.setState({
        showPrompt : !this.state.showPrompt
      }
    )
  };

  deleteAccount = () => {
    axios.delete(`${Constants.API_URL}/users`)
      .then(
        response => {

        }, err => {

        })
  };

  render() {
    const {showPrompt} = this.state;
    return (
      <React.Fragment>
        <Modal open={this.props.open} onClose={this.props.close}>
          <div className="main">
            <div className="title">
              <h2>Setarile mele</h2>
            </div>

            <div className="checkbox-container">
              <div>Doresc sa primesc email-uri</div>
              <div className="checkbox">
                <label className="switch">
                  <input disabled={true} type="checkbox"/>
                  <span className="slider"></span>
                </label>
              </div>
            </div>

            {!showPrompt &&
            <div className="delete button-container">
              <button className="btn btn-danger" onClick={this.toggleConfirmPrompt}>STERGE ACEST CONT</button>
            </div>
            }
            {showPrompt &&
            <div className="delete">
              <div>Esti pe cale sa stergi acest cont.
                Esti sigur de aceasta decizie?
              </div>
              <div className="button-container">
                <button className="btn btn-danger" onClick={this.deleteAccount}>DA</button>
              </div>
            </div>}
          </div>
        </Modal>


      </React.Fragment>
    )
  }
}
