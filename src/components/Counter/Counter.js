import React from 'react';
import Button from '../Button';
import SettingsModal from '../SettingsModal';
import 'react-circular-progressbar/dist/styles.css';
import SegmentedProgressbar from './SegmentedProgressbar';
import './Counter.css';

const percentage = 66;

export default class Counter extends React.Component {

  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);

    this.state = {
      modalOpen: false,
    }
  }

  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen,
    })
  }

  render() {
    return(
      <div className="container">
        <div className="counter" style={{height:300 , width:300,}}>
          <SegmentedProgressbar
            percentage={percentage}
          />
        </div>
        <a href={window.drawingUrl} className="button" download="My-Romania.png">DESCARCĂ</a>
        <Button handleClick={this.toggleModal} buttonText="SETARI"/>
        <SettingsModal open={this.state.modalOpen} closeModal={this.toggleModal}/>
      </div>
    );
  }
}
