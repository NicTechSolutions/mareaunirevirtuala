import React from 'react';
import Button from '../Button';

import './Compliance.css';

export default class Compliance extends React.Component {
    submit = () => {
        console.log("Useru e ok sa ii se fure datele");
        this.props.onFinish();
    }

    render() {
        return (
            <React.Fragment>
                <div className="compliance-info">
                    RO100 utilizeaza fisiere de tip cookie pentru a imbunatati experienta
                    si interactiunea ta cu acest website. Confidentialitatea ta este importanta,
                    astfel printr-un clic pe buton "Sunt de acord" accepti utilizarea tehnologiilor cookie.
                </div>
                <Button handleClick={this.submit} buttonText="Sunt de acord" />
                <div className="extra">
                    <a href="#" >Mai multe informatii despre cookie-uri si modificarile propuse de Regulamentul (UE) 2016/679.</a>
                </div>
            </React.Fragment>
        )
    }
}