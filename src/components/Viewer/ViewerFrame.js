import React from 'react';
import Viewer from './Viewer';
import getImage from '../../utils/getImage';

export default class ViewerFrame extends React.Component {
    state = {
        image: null,
    };

    
    componentDidMount(props) {
        console.log("in viewer frame");
        getImage("/test_4096x1936.jpg").then((image, black, white) => {
            this.setState({ image });
            console.log('loaded img');
        })
    }
    render() {
        const { image } = this.state;

        return (
            <React.Fragment>
                {!image && <div>waiting for file....</div>}
                {image && <Viewer image={image}></Viewer>}
            </React.Fragment>
        );
    }
}