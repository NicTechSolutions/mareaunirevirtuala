import React from 'react';
import Modal from 'react-responsive-modal';
import axios from 'axios';
import PropTypes from 'prop-types';
import { NotificationManager } from 'react-notifications';

import "./SettingsModal.css";

import OptIns from './OptIns';

import Constants from '../../constants/Constants';

export default class SettingsModal extends React.Component {

  static propTypes = {
    open: PropTypes.bool,
    close: PropTypes.func,
  };

  static defaultProps = {
    open: false,
    closeModal: Function.prototype,
  };

  componentDidMount() {
    this.getOpts();
  }

  constructor(props) {
    super(props);

    this.state = {
      showPrompt: false,
      fetchedOps: false,
      opts: []
    }
  };

  toggleConfirmPrompt = () => {
    this.setState({
      showPrompt: !this.state.showPrompt
    }
    )
  };

  getOpts = () => {
    axios.get(`${Constants.API_URL}/users/emails`)
      .then(
        response => {
          const opts = response.data.compliance;
          if (Object.keys(opts).length === 0 && opts.constructor === Object) {
            this.setState({
              opts: [{
                message: "Doresc sa primesc emailuri generale",
                value: false,
                id: "all"
              }, {
                message: "Doresc emailuri pentru viitoare evenimente",
                value: true,
                id: "next"
              },
              {
                message: "Doresc emailuri pentru marketing",
                value: false,
                id: "marketing"
              }
              ]
            })

          }
        }, err => {

        })
  }

  updateOpts(opts) {
    // console.log(Object.values(opts));
    const params = Object.values(opts).reduce(function (result, currentObject) {
      for (var key in currentObject) {
        if (currentObject.hasOwnProperty(key)) {
          result[key] = currentObject[key];
        }
      }
      return result;
    }, {});

    console.log(params);

    axios.put(`${Constants.API_URL}/users/emails`, {
      params
    })
  }

  deleteAccount = () => {
    axios.delete(`${Constants.API_URL}/users`)
      .then(
        response => {
          NotificationManager.success("Cont sters cu succes");
          this.props.closeModal();

        }, err => {
          NotificationManager.error("Eroare");
          this.props.closeModal();
        })
  };

  render() {
    const { showPrompt } = this.state;
    return (
      <React.Fragment>
        <Modal open={this.props.open} onClose={this.props.closeModal}>
          <div className="settings-container">
            <div className="title">
              <h2>Setarile mele</h2>
            </div>

            <OptIns opts={this.state.opts} onUpdate={this.updateOpts}></OptIns>

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
