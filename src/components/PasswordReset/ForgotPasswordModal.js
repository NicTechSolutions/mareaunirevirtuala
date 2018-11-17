import React from 'react';
import axios from 'axios';
import Modal from 'react-responsive-modal';
import Button from '../Button';

import Constants from '../../constants/Constants';

import "./ForgotPasswordModal.css";

export default class ForgotPasswordModal extends React.Component {
    state = {
        open: true,
        email: '',
        loading: false
    }

    onClose = () => {
        this.setState({
            open: false,
            email: ''
        })
    }

    switchLoading() {
        this.setState({
            loading: !this.state.loading,
        });
    }


    submit = () => {
        this.switchLoading();

        axios.post(`${Constants.API_URL}/email/forgot?email=${this.state.email}`).then(res => {
            this.switchLoading();
            if (res.status === 200) {
                console.log("ok");
            }
        }).catch(err => {
            this.switchLoading();
            console.log("not ok");
        })
    }

    render() {

        return (
            <React.Fragment>
                <Modal open={this.state.open} onClose={this.onClose}>
                    <div className="main-container">
                        <div className="content">
                            <input className="input" type="email" placeholder="Email" value={this.state.email}
                                onChange={({ target: { value } }) => {
                                    this.setState({ email: value })
                                }} />
                            {this.state.loading &&
                                <div className="loader-container">
                                    <div className="loader"></div>
                                </div>}
                            {!this.state.loading && <Button handleClick={this.submit} buttonText="Trimite email"></Button>}
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        )
    }
}