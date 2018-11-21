import React from 'react';
import cameraData from '../assets/camera_para.dat';
import hiro from '../assets/path.hiro';



/**
 * Initialize AR Toolkit from our three.js objects so that it can detect the Hiro marker
 *
 * @param {Object} renderer: the WebGL renderer from three.js
 * @param {Object} camera the camera object from three.js
 * @param {Array} onRenderFcts an array of functions which will be executed every frames
 * @returns {Object} An ArToolkitContext instance
 */
let ArMarkerControls;
let ArToolkitContext;
let ArToolkitSource;
let Color;
let WebGLRenderer;

export default class ArToolkit extends React.Component {
    componentWillMount() {
        var s = document.createElement('script');
        s.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/85/three.min.js";
        document.head.appendChild(s);
        var s2 = document.createElement('script');
        s2.src = "https://cdn.rawgit.com/jeromeetienne/AR.js/1.5.0/aframe/build/aframe-ar.js";
        document.head.appendChild(s2);
    }

    componentDidMount() {
        ArMarkerControls = window.THREEx.ArMarkerControls;
        ArToolkitSource = window.THREEx.ArToolkitSource;
        ArToolkitContext = window.THREEx.ArToolkitContext;
    }

    static initializeArToolkit(renderer, camera, onRenderFcts) {
        ArToolkitContext.baseURL = '../';
        const arToolkitSource = new ArToolkitSource({ sourceType: 'webcam' });

        arToolkitSource.init(() => {
            arToolkitSource.onResize(renderer.domElement);
        });

        window.addEventListener('resize', () => {
            arToolkitSource.onResize(renderer.domElement);
        });

        // create an arToolkitContext
        const arToolkitContext = new ArToolkitContext({
            cameraParametersUrl: cameraData,
            // THe hiro marker is monochrome
            detectionMode: 'mono',
            maxDetectionRate: 30,
            // The two following settings adjusts the resolution. Higher is better (less flickering) but slower
            canvasWidth: 800,
            canvasHeight: 600,
        });

        arToolkitContext.init(() => {
            camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
        });

        // update artoolkit on every frame
        onRenderFcts.push(() => {
            if (arToolkitSource.ready === false) return;
            arToolkitContext.update(arToolkitSource.domElement);
        });

        return arToolkitContext;
    }

    /**
     * Initialize AR Toolkit Hiro marker
     *
     * @param {Object} arToolkitContext: the ArToolkitContext instance
     * @param {Object} markerRoot a DOM element where to put the marker
     * @returns {Object} An ArMarkerControls instance
     */
    static getMarker(arToolkitContext, markerRoot) {
        return new ArMarkerControls(arToolkitContext, markerRoot, {
            type: 'pattern',
            patternUrl: hiro,
        });
    }

    static initializeRenderer(canvas) {
        const renderer = new WebGLRenderer({ alpha: true, canvas });

        renderer.setClearColor(new Color('lightgrey'), 0);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = '0px';
        renderer.domElement.style.left = '0px';
    
        return renderer;
    }

}
