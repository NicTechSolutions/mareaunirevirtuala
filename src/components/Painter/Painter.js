import React from 'react';
import CanvasDraw from 'react-canvas-draw';

export default class Painter extends React.Component {
  render() {
    return(
      <CanvasDraw
        brushSize={7}
        brushColor="#87cefa"
        canvasWidth={window.innerWidth}
        canvasHeight={window.innerHeight}
      />
    )
  }
}
