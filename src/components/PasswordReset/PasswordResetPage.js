import React from 'react';

import "./PasswordResetPage.css";
import Button from '../Button';

export default class PasswordResetPage extends React.Component {
    state = {
        password: null,
        passwordCheck: null
    };

    onSubmit = () => {
        console.log("resetting pass");
    }

    render() {

        return (
            <React.Fragment>
                <div className="main">
                    <input className="input" type="email" placeholder="Parola noua" value={this.state.password}
                        onChange={({ target: { value } }) => {
                            this.setState({ password: value })
                        }} />
                    <input className="input" type="email" placeholder="Reintroduce parola" value={this.state.passwordCheck}
                        onChange={({ target: { value } }) => {
                            this.setState({ passwordCheck: value })
                        }} />
                    <Button handleClick={this.onSubmit} buttonText="Reseteaza"></Button>
                </div>
            </React.Fragment>
        )
    }
}