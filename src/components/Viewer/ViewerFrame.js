import React from 'react';
import Viewer from './Viewer';

export default class ViewerFrame extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Viewer></Viewer>
            </React.Fragment>
        );
    }
}