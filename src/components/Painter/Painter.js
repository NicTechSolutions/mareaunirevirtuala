import React from 'react';
import CanvasDraw from 'react-canvas-draw';

import Button from '../Button';

import './Painter.css'

const COLORS = ['black', 'grey', 'white', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

export default class Painter extends React.Component {

  constructor(props) {
    super(props);

    this.toRef       = this.toRef.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);

    this.state = {
      activeColor     : COLORS[0],
      activeBrushSize : 5
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
    return (
      <React.Fragment>
        <div className="toolbar">
          <div className="size">
            SIZE:
            <div className="size-button"
                 onClick={() => this.setState({activeBrushSize : this.state.activeBrushSize - 1})}>-</div>
            {this.state.activeBrushSize}
            <div className="size-button"
                 onClick={() => this.setState({activeBrushSize : this.state.activeBrushSize + 1})}>+</div>
          </div>
          <div className="colors">
            {COLORS.map(color => (
              <div key={color} className="swatch" style={{backgroundColor : color}}
                   onClick={() => this.setState({activeColor : color})}/>
            ))}
          </div>
        </div>
        <CanvasDraw
          ref={this.toRef}
          brushSize={this.state.activeBrushSize}
          brushColor={this.state.activeColor}
          canvasWidth={window.innerWidth}
          canvasHeight={window.innerHeight}
        />
        <div className="button-bar">
          <Button handleClick={this.clearCanvas} buttonText="CLEAR"/>
          <Button handleClick={Function.prototype} buttonText="SAVE"/>
        </div>
      </React.Fragment>
    )
  }
}
