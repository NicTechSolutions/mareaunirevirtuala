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
          this.setState({
            opts: [
              {
                id: "all",
                message: "Emailuri generale",
                value: opts.all
              },
              {
                id: "marketing",
                message: "Emailuri pentru marketing",
                value: opts.marketing
              }, {
                id: "next",
                message: "Ce urmeaza sa facem",
                value: opts.next
              }
            ]
          });

        }, err => {

        })
  }

  updateOpts(opts) {
    const mapped = opts.map(opt => {
      return {
        [opt.id]: opt.value
      }
    });

    const params = mapped.reduce(function (result, currentObject) {
      for (var key in currentObject) {
        if (currentObject.hasOwnProperty(key)) {
          result[key] = currentObject[key];
        }
      }
      return result;
    }, {})

    axios.put(`${Constants.API_URL}/users/emails`, params);
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
              <div className="button-container">
                <button className="btn btn-danger delete-account-button" onClick={this.toggleConfirmPrompt}>STERGE ACEST CONT</button>
              </div>
            }
            {showPrompt &&
              <div className="delete">
                <div className="check-container">Esti pe cale sa stergi acest cont.
                  Esti sigur de aceasta decizie?
              </div>
                <div className="button-container">
                  <button className="btn btn-info delete-account-button" onClick={() => { this.setState({ showPrompt: false }) }}>Nu</button>
                  <button className="btn btn-danger cancel-delete" onClick={this.deleteAccount}>Da, sunt sigur</button>
                </div>
              </div>}
          </div>
        </Modal>


      </React.Fragment>
    )
  }
}
