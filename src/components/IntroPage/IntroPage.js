import React from 'react';

import "./IntroPage.css";
import Button from '../Button';

export default class IntroPage extends React.Component {
    participate = () => {
        this.props.history.push("/");
    }
    
    render() {
        return (

            <React.Fragment>
                <div className="content-container">
                    <img className="logo" src={"/intro-logo.jpeg"}></img>
                    <div className="hr-style"></div>
                    <img className="instructions" src={"/intro-instructions.jpeg"}></img>
                    <div className="participateButton">
                        <Button handleClick={this.participate} buttonText="Vreau sa particip!"></Button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}