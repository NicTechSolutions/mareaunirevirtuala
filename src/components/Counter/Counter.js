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
        <div className="counter" style={{height:200 , width:200,}}>
          <SegmentedProgressbar
            percentage={percentage}
          />
        </div>
        {
          window.drawingUrl ?
            <a href={window.drawingUrl} download="My-Romania.jpeg">
              <img src={downloadIcon} className="image"/>
              <div>DESCARCĂ</div>
            </a> :
            <button onClick={this.navigateToPainter}>
              <img src={drawIcon} className="image"/>
              <div>DESENEAZA</div>
            </button>
        }
        <button onClick={this.toggleModal}>
          <img src={settingsIcon} className="image"/>
          <div>SETARI</div>
        </button>
        {/*<Button handleClick={this.toggleModal} buttonText="SETARI"/>*/}
        <SettingsModal open={this.state.modalOpen} closeModal={this.toggleModal}/>
      </div>
    );
  }
}

export default withRouter(Counter);
