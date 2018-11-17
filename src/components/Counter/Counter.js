import React from 'react';
import Button from '../Button';
import SettingsModal from '../SettingsModal';

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
      <React.Fragment>
        <div>Counter</div>
        <a href={window.drawingUrl} className="button" download="My-Romania.png">DESCARCĂ</a>
        <Button handleClick={this.toggleModal} buttonText="SETARI"/>
        <SettingsModal open={this.state.modalOpen} closeModal={this.toggleModal}/>
      </React.Fragment>
    );
  }
}
