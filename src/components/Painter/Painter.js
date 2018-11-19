import React from 'react';
import CanvasDraw from 'react-canvas-draw';

import { withRouter } from 'react-router-dom';

import Button from '../Button';

import './Painter.css'

const COLORS = ['red', 'yellow', 'blue'];

class Painter extends React.Component {
  constructor(props) {
    super(props);

    this.toRef       = this.toRef.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.saveDrawing = this.saveDrawing.bind(this);
    this.undo        = this.undo.bind(this);

    this.state = {
      activeColor     : COLORS[0],
      activeBrushSize : 5,
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

  undo() {
    if (this.canvas) {
      this.canvas.undo();
    }
  }

  saveDrawing() {
    if (this.canvas) {
      window.drawingUrl = this.canvas.canvas.toDataURL();
      this.props.history.push('/counter')
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="toolbar">
          <div className="size">
            DIMENSIUNE:
            <div className="size-button"
                 onClick={() => {
                   if (this.state.activeBrushSize - 1 > 0) {
                     this.setState({activeBrushSize : this.state.activeBrushSize - 1})
                   }
                 }}>-</div>
            {this.state.activeBrushSize}
            <div className="size-button"
                 onClick={() => this.setState({activeBrushSize : this.state.activeBrushSize + 1})}>+
            </div>
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
          style={{position: 'static'}}
          gridColor="rgba(150,150,150,0.17)"
          hideGrid={false}
          brushSize={this.state.activeBrushSize}
          brushColor={this.state.activeColor}
          canvasWidth={window.innerWidth}
          canvasHeight={window.innerHeight}
        />
        <div className="button-bar">
          <Button handleClick={this.clearCanvas} buttonText="ȘTERGE"/>
          <Button handleClick={this.undo} buttonText="ANULEAZĂ"/>
          <Button handleClick={this.saveDrawing} buttonText="TRIMITE"/>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(Painter);
