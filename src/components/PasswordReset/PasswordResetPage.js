import React from 'react';
import PropTypes from 'prop-types';
import "./PasswordResetPage.css";
import Button from '../Button';
import axios from 'axios';
import * as queryString from 'query-string';
import {NotificationManager} from "react-notifications";

import Constants from '../../constants/Constants'

export default class PasswordResetPage extends React.Component {
    static propTypes = {
        onRegister: PropTypes.func.isRequired,
    };

    state = {
        password: '',
        passwordCheck: '',
        loading: false,
        displayError: false
    };

    switchLoading() {
        this.setState({
            loading: !this.state.loading,
        });
    }

    onSubmit = () => {
        if (this.state.password !== this.state.newPassword) {
            this.setState({displayError: true});
            this.setState({password: ''});
            this.setState({passwordCheck: ''});
            return;
        }

        const token = queryString.parse(this.props.location.search).token;
        this.switchLoading();
        axios.post(`${Constants.API_URL}/password/reset?token=${token}`,{
                "newPassword": this.state.password
            }
        ).then(res => {
            this.switchLoading();
            if (res.status === 200) {
                NotificationManager.success("Success");
                this.props.history.push('/')
            }
        }).catch(e => {
            this.switchLoading();
        })

    }

    render() {
        const { loading } = this.state;
        return (
            <React.Fragment>
                <div className="main">
                    <div className="content">
                        <div className={ this.state.displayError ? "alert alert-danger" : "d-none" }  >
                            Cele doua parole introduse nu sunt identice.
                        </div>
                        <input className="input" type="password" placeholder="Parola noua" value={this.state.password}
                            onChange={({ target: { value } }) => {
                                this.setState({ password: value });
                                this.setState({displayError: false});
                            }} />
                        <input className="input" type="password" placeholder="Reintroduce parola" value={this.state.passwordCheck}
                            onChange={({ target: { value } }) => {
                                this.setState({ passwordCheck: value });
                                this.setState({displayError: false});
                            }} />

                        {loading &&
                            <div className="loader-container">
                                <div className="loader"></div>
                            </div>}
                        {!loading && <Button handleClick={this.onSubmit} buttonText="Reseteaza"></Button>}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}