import React from 'react';
import Button from '../Button';
import Modal from 'react-responsive-modal';
import "./SettingsPage.css";

export default class SettingsPage extends React.Component {
    state = {
        modalOpened: false
    }

    openConfirmModal = () => {
        this.setState({
            modalOpened: true
        }
        )
    };

    onConfirmModalClose = () => {
        this.setState({
            modalOpened: false
        })
    }

    render() {
        const { modalOpened } = this.state;
        return (
            <React.Fragment>
                <div className="container">
                    <div className="title"><h1>Setarile mele</h1></div>

                    <button className="delete btn btn-danger" onClick={this.openConfirmModal}>VREAU SA STERG ACEST CONT</button>
                    <Modal open={modalOpened} onClose={this.onConfirmModalClose}>
                        <div className="confirm-container">
                            <div>Esti pe cale sa stergi acest cont.
                                 Esti sigur de aceasta decizie?</div>
                            <div className="button-container">
                                <button className="btn btn-danger" onClick={this.onClose}>DA</button>
                            </div>
                        </div>
                    </Modal>
                </div>


            </React.Fragment>
        )
    }
}