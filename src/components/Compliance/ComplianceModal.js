import React from 'react';
import Modal from 'react-responsive-modal';
import Compliance from './Compliance';

export default class ComplainceModal extends React.Component {

    state = {
        open: true
    };

    onClose = () => {
        this.setState({
            open: false,
        });
    }
    render() {
        const { open } = this.state;
        return (
            <React.Fragment>
                <Modal open={open} onClose={this.onClose}>
                    <Compliance onFinish={this.onClose}></Compliance>
                </Modal>
            </React.Fragment>
        )
    }
}