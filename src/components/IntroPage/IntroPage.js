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
                <div className="container" ref={this.toRef}>
                    <div>
                        <div class="inline"><div className="checked"></div><div class="text">Inscrie-te</div> </div>
                        <div className="rect"></div>
                        <div class="inline"><div className="pencil"></div> <div class="text">Inscrie-te</div> </div>
                        <div className="rect"></div>
                        <div class="inline"><div className="romania"></div> <div class="text">Inscrie-te</div></div>
                    </div>
                    <Button handleClick={this.participate} buttonText="TRIMITE UN GÂND BUN" />
                </div>
            </React.Fragment>
        )
    }
}
