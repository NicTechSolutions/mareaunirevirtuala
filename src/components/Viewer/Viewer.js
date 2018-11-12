import React from 'react';
import { initializeArToolkit, getMarker } from '../../utils/arToolkit';
import initializeRenderer from '../../utils/initializeRenderer';
import detectEdge from '../../utils/detecEdge';
import getImage from '../../utils/getImage';

const { Camera, DoubleSide, Group, Mesh, MeshBasicMaterial, PlaneGeometry, Scene, Texture } = window.THREE;

export default class Viewer extends React.Component {
    componentDidMount() {
        const {
            blackImage,
            coordX,
            coordZ,
            onMarkerFound,
            opacity,
            scaleX,
            scaleY,
            rotation
        } = this.props;

        // initializeRenderer instanciate a new WebGlRenderer from three.js with some options
        // for opacity, size, etc.
        const renderer = this.renderer = initializeRenderer(this.canvas);
        const  image = getImage('../../assets/test.png');
        const scene = new Scene();
        const camera = new Camera();
        scene.add(camera);

        const markerRoot = new Group();
        scene.add(markerRoot);
        const onRenderFcts = []; // Array of functions called for each rendering frames
        const arToolkitContext = initializeArToolkit(renderer, camera, onRenderFcts);
        const marker = getMarker(arToolkitContext, markerRoot);


        //  instantiate the plane on which to draw our image
        // It will be oriented correctly by arToolKit depending on the marker orientation
        const geometry = new PlaneGeometry(1, 1, 1);


        // Create a texture for our image
        const texture = new Texture(image);
        texture.needsUpdate = true; // This instruct three.js to update this object at next render

        // Create a material for our image to use on the mesh we'll create later
        this.material = new MeshBasicMaterial({
            map: texture,
            opacity,
            side: DoubleSide,
            transparent: true,
        });

        // From the new plane and material, instantiate a three.js mesh
        this.mesh = new Mesh(geometry, this.material);


        // This rotation is necessary to have the image in front of us
        this.mesh.rotation.x = - Math.PI / 2; // -90°

        // Instruct arToolKit to display this image at the hiro marker position
        markerRoot.add(this.mesh);

        // at each frame render, update the scene
        onRenderFcts.push(function () {
            renderer.render(scene, camera);
        });

        // run the rendering loop
        var lastTimeMsec = null;

        function animate(nowMsec) {
            // keep looping
            requestAnimationFrame(animate);
            // measure time
            lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60;
            const deltaMsec = Math.min(200, nowMsec - lastTimeMsec);
            lastTimeMsec = nowMsec;
            // call all registered update functions
            onRenderFcts.forEach(onRenderFct => {
                onRenderFct(deltaMsec / 1000, nowMsec / 1000);
            });
        }

        requestAnimationFrame(animate);

    }

    componentWillUnmount() {
        this.renderer.dispose();
    }

    componentDidUpdate() {
        // Here we update the mesh and material from user preferences
        const { coordX, coordZ, scaleX, scaleY, rotation } = this.props;

        // Apply the user preferences for rotation, position and zoom
        this.mesh.position.x = coordX;
        this.mesh.position.z = coordZ;
        this.mesh.scale.x = scaleX;
        this.mesh.scale.y = scaleY;
        this.mesh.rotation.z = rotation;
        this.mesh.needsUpdate = true; // Instruct three.js to update this object at next render

        const { blackImage, image } = this.props;
        const { opacity, isDetectingEdge, blur, lowTreshold, highTreshold } = this.props;

        // We added a way for Trinity to enable edge detection
        if (isDetectingEdge) {
            this.material.opacity = 1;
            const alphaImage = detectEdge(image, { blur, lowTreshold, highTreshold });
            const alphaTexture = new Texture(alphaImage);
            alphaTexture.needsUpdate = true;
            this.material.alphaMap = alphaTexture;
            this.material.map.image = blackImage;
            this.material.map.needsUpdate = true;
        } else {
            this.material.opacity = opacity;
            this.material.alphaMap = null;
            const texture = new Texture(image);
            texture.needsUpdate = true;
            this.material.map = texture;
        }
        this.material.needsUpdate = true;
    }

    render() {
        return (
            <React.Fragment>
                <canvas id="root" ref={this.storeRef} />
            </React.Fragment>
        );
    }
}
