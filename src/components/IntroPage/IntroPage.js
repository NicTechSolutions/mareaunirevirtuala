import React from 'react';

import "./IntroPage.css";
import Button from '../Button';
import Cookies from 'universal-cookie';

export default class IntroPage extends React.Component {
    cookies = new Cookies();
    constructor(props) {
        super(props);
        const token = this.cookies.get('token');
        if (token) {
            this.props.history.push('/counter');
        }
    }

    participate = () => {
        this.props.history.push("/landing");
    };

    render() {
        return (

            <React.Fragment>
                <div className="container">
                    <div className="logo"></div>
                    <div className="logo-intro">
                        <div className="inline"><div className="checked"></div><div className="text">Inscrie-te</div> </div>
                        <div className="rect"></div>
                        <div className="inline"><div className="pencil"></div> <div className="text">Creioneaza-ti gandul</div> </div>
                        <div className="rect"></div>
                        <div className="inline"><div className="romania"></div> <div className="text">Fii parte din cel mai mare mozaic virtual</div></div>
                    </div>
                    <Button handleClick={this.participate} buttonText="INSCIRE-TE" />
                </div>
            </React.Fragment>
        )
    }
}
