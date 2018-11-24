import React from 'react';
import axios from 'axios';
import SettingsModal from '../SettingsModal';
import 'react-circular-progressbar/dist/styles.css';
import SegmentedProgressbar from './SegmentedProgressbar';
import { withRouter } from 'react-router-dom';
import './Counter.css';

import downloadIcon from './assets/download1.svg'
import settingsIcon from './assets/settings.svg';
import drawIcon from './assets/tools.svg';
import Button from '../Button';
import Constants from '../../constants/Constants';

// const number = 66;

const milestones = [100, 1000, 10000, 100000, 1000000];

class Counter extends React.Component {

  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
    this.navigateToPainter = this.navigateToPainter.bind(this);

    this.state = {
      modalOpen: false,
      number: 0
    }
    axios.get(`${Constants.API_URL}/users/counter`)
    .then((response) => {
      this.setState({ number:response.data} );
    }).catch((err) => {
      console.log(err);
    });
  }

  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen,
    })
  }

  navigateToPainter() {
    this.props.history.push('/painter');
  }

  downloadImage() {

  }

  render() {
    return (
      <div className="container">
        <div className="settingsButton" onClick={this.toggleModal}></div>
        <div className="counter" style={{ height: 200, width: 200, marginBottom: 20 }}>
          <SegmentedProgressbar
            percentage={(this.state.number / (milestones.find(m => m > this.state.number))) * 100}
            text={this.state.number}
          />
        </div>
        <p className="submit-text">Pana acum, {this.state.number} de romani au desenat Romania asa cum si-au dorit!</p>
        {
          window.drawingUrl ?
            <Button handleClick={this.downloadImage} buttonText="Descarca"></Button>
            :
            <Button handleClick={this.navigateToPainter} buttonText="Incepe"></Button>
        }
        <SettingsModal open={this.state.modalOpen} closeModal={this.toggleModal} />
      </div>
    );
  }
}

export default withRouter(Counter);
