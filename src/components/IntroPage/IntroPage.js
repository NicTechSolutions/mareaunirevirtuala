import React from 'react';

import "./IntroPage.css";
import Button from '../Button';

export default class IntroPage extends React.Component {
    participate = () => {
        this.props.history.push("/landing");
    };

    render() {
        return (

            <React.Fragment>
                <div className="container">
                    <div class="logo"></div>
                    <div class="logo-intro">
                        <div class="inline"><div className="checked"></div><div class="text">Inscrie-te</div> </div>
                        <div className="rect"></div>
                        <div class="inline"><div className="pencil"></div> <div class="text">Creioneaza-ti gandul</div> </div>
                        <div className="rect"></div>
                        <div class="inline"><div className="romania"></div> <div class="text">Fii parte din cel mai mare mozaic virtual</div></div>
                    </div>
                    <Button handleClick={this.participate} buttonText="TRIMITE UN GÂND BUN" />
                </div>
            </React.Fragment>
        )
    }
}
