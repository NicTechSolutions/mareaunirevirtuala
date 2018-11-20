import React from 'react';
import { disableBodyScroll } from 'body-scroll-lock';

import "./IntroPage.css";
import Button from '../Button';

export default class IntroPage extends React.Component {
    constructor(props) {
        super(props);

        this.toRef = this.toRef.bind(this);
        disableBodyScroll(this.toRef);
    }

    toRef(el) {
        this.bgroundRef = el;
    }

    participate = () => {
        this.props.history.push("/landing");
    };

    render() {
        return (

            <React.Fragment>
                <div className="content-container" ref={this.toRef}>
                    <div className="participateButton">
                        <Button handleClick={this.participate} buttonText="Vreau sa particip!"/>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
