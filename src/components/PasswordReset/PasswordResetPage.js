import React from 'react';

import "./PasswordResetPage.css";
import Button from '../Button';
import axios from 'axios';
import * as queryString from 'query-string';

import Constants from '../../constants/Constants'

export default class PasswordResetPage extends React.Component {
    state = {
        password: '',
        passwordCheck: '',
        loading: false
    };

    switchLoading() {
        this.setState({
            loading: !this.state.loading,
        });
    }

    onSubmit = () => {
        const token = queryString.parse(this.props.location.search).token;
        console.log(token);
        this.switchLoading();
        axios.post(`${Constants.API_URL}/password/reset?token=${token}`,{
                "newPassword": this.state.password
            }
        ).then(res => {
            this.switchLoading();
            if (res.status === 200) {
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
                        <input className="input" type="email" placeholder="Parola noua" value={this.state.password}
                            onChange={({ target: { value } }) => {
                                this.setState({ password: value })
                            }} />
                        <input className="input" type="email" placeholder="Reintroduce parola" value={this.state.passwordCheck}
                            onChange={({ target: { value } }) => {
                                this.setState({ passwordCheck: value })
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