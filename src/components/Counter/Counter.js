import React from 'react';
import SettingsModal from '../SettingsModal';
import 'react-circular-progressbar/dist/styles.css';
import SegmentedProgressbar from './SegmentedProgressbar';
import { withRouter } from 'react-router-dom';
import './Counter.css';

import downloadIcon from './assets/download1.svg'
import settingsIcon from './assets/settings.svg';
import drawIcon from './assets/tools.svg';

const percentage = 66;

class Counter extends React.Component {

  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
    this.navigateToPainter = this.navigateToPainter.bind(this);

    this.state = {
      modalOpen: false,
    }
  }

  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen,
    })
  }

  navigateToPainter() {
    this.props.history.push('/painter');
  }

  render() {
    return(
      <div className="container">
        <div className="counter" style={{height:200 , width:200, marginBottom: 20}}>
          <SegmentedProgressbar
            percentage={percentage}
          />
        </div>
        <p className="submit-text">Pana acum, {percentage} de romani au desenat Romania asa cum si-au dorit!</p>
        {
          window.drawingUrl ?
            <a href={window.drawingUrl} download="My-Romania.jpeg" className="image-button">
              <img src={downloadIcon} alt="descarca" className="image"/>
              <div>DESCARCĂ</div>
            </a> :
            <div onClick={this.navigateToPainter} className="image-button">
              <img src={drawIcon} alt="deseneaza" className="image"/>
              <div>DESENEAZA</div>
            </div>
        }
        <div onClick={this.toggleModal} className="image-button">
          <img src={settingsIcon} alt="setari" className="image"/>
          <div>SETARI</div>
        </div>
        <SettingsModal open={this.state.modalOpen} closeModal={this.toggleModal}/>
      </div>
    );
  }
}

export default withRouter(Counter);
