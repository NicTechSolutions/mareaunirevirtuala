import React from 'react';
import Viewer from './Viewer';

let ImageUtils;
export default class ViewerFrame extends React.Component {
    state = {
        image: null,
    };

    componentWillMount() {
        var s = document.createElement('script');
        s.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/85/three.min.js";
        document.head.appendChild(s);
    }

    componentDidMount(props) {
        console.log("in viewer frame");
        let context = this;
        
        ImageUtils = window.THREE.ImageUtils;

        const image =  ImageUtils.loadTexture("/test_4096x1936.png", undefined, function () {
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