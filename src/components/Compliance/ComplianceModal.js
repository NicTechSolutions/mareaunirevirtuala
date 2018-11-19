import React from 'react';
import Modal from 'react-responsive-modal';
import PropTypes from 'prop-types';
import Button from '../Button';

import './Compliance.css';

export default class ComplianceModal extends React.Component {
    static propTypes = {
      onSubmit: PropTypes.func.isRequired,
      open: PropTypes.bool,
    };

    static defaultProps = {
      open: false,
    };

    render() {
        return (
            <Modal open={this.props.open} showCloseIcon={false}>
                <div className="compliance-info">
                    RO100 utilizeaza fisiere de tip cookie pentru a imbunatati experienta
                    si interactiunea ta cu acest website. Confidentialitatea ta este importanta,
                    astfel printr-un clic pe buton "Sunt de acord" accepti utilizarea tehnologiilor cookie.
                </div>
                <Button handleClick={this.props.onSubmit} buttonText="Sunt de acord" />
                <div className="extra">
                    <a href="#" >Mai multe informatii despre cookie-uri si modificarile propuse de Regulamentul (UE) 2016/679.</a>
                </div>
            </Modal>
        )
    }
}
