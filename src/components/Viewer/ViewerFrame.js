import React from 'react';
import Viewer from './Viewer';

const { ImageUtils } = window.THREE;
export default class ViewerFrame extends React.Component {
    state = {
        image: null,
    };


    componentDidMount(props) {
        console.log("in viewer frame");
        let context = this;
        const image = ImageUtils.loadTexture("/test.png", undefined, function () {
            context.setState({ image });
            console.log('loaded img');
        });
    }
    render() {
        const { image } = this.state;

        return (
            <React.Fragment>
                {!image && <div>waiting for file....</div>}
                {image && <Viewer texture={image}></Viewer>}
            </React.Fragment>
        );
    }
}