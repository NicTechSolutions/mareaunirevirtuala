import React from 'react';
import Modal from 'react-responsive-modal';
import PropTypes from 'prop-types';
import Button from '../Button';
import Cookies from 'universal-cookie';

import './Compliance.css';

export default class ComplianceModal extends React.Component {
    cookies = new Cookies();

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        open: PropTypes.bool,
    };

    static defaultProps = {
        open: false,
    };
    handleUserAccept = () => {
        this.setComplianceCookie(true);
        this.props.onSubmit();
    };

    setComplianceCookie(userAgreement) {
        this.cookies.set("gdpr_compliance", userAgreement);
    }

    render() {
        return (
            <Modal open={this.props.open} showCloseIcon={false} onClose={Function.prototype}>
                <div className="compliance-info">
                    Platforma Marea Unire Virtuala utilizeaza fisiere de tip cookie pentru a imbunatati experienta
                    si interactiunea ta cu acesta. Confidentialitatea ta este importanta,
                    astfel printr-un clic pe buton "Sunt de acord" accepti utilizarea tehnologiilor cookie.
                </div>
                <Button handleClick={this.handleUserAccept} buttonText="Sunt de acord" />
                <div className="extra">
                    <a href="#" >Mai multe informatii despre cookie-uri si modificarile propuse de Regulamentul (UE) 2016/679.</a>
                </div>
            </Modal>
        )
    }
}
