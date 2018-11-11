import React from 'react';
import CanvasDraw from 'react-canvas-draw';

import Button from '../Button';

import './Painter.css'

const COLORS = ['black', 'grey', 'white', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
const SIZES = [2, 4, 8, 16, 32, 64];

export default class Painter extends React.Component {

  constructor(props) {
    super(props);

    this.toRef = this.toRef.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);

    this.state = {
      activeColor: COLORS[0],
      activeBrushSize: SIZES[0]
    };
  }

  toRef(el) {
    this.canvas = el;
  }

  clearCanvas() {
    if (this.canvas) {
      this.canvas.clear();
    }
  }

  render() {
    return(
      <React.Fragment>
        <CanvasDraw
          ref={this.toRef}
          brushSize={this.state.activeBrushSize}
          brushColor={this.state.activeColor}
          canvasWidth={window.innerWidth}
          canvasHeight={window.innerHeight}
        />
        <div className="button-bar">
          <Button handleClick={this.clearCanvas} buttonText="CLEAR" />
          <Button handleClick={Function.prototype} buttonText="SAVE" />
        </div>
      </React.Fragment>
    )
  }
}
