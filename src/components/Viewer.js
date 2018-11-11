import React from 'react';
// import THREEx from 'three';

export default class Viewer extends React.Component {

    render() {
        return (
            <React.Fragment>
                <a-scene embedded arjs='sourceType: webcam;'>
                    <a-box position='0 0.5 0' material='opacity: 0.5;'></a-box>
                    <a-marker-camera preset='hiro'></a-marker-camera>
                </a-scene>
            </React.Fragment>
        );
    }
}
