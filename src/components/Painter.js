import React from 'react';
import '../styles/painter.css';

export default class Painter extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dragging: false,
      activeColor: 'black',
      colors: ['black', 'grey', 'white', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
    };

    this.engage = this.engage.bind(this);
    this.disengage = this.disengage.bind(this);
    this.putPoint = this.putPoint.bind(this);

    this.canvasRef = this.canvasRef.bind(this);

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);

    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
  }

  canvasRef(el) {
    this.canvas = el;
  }

  engage(e) {
    e.preventDefault();

    this.setState({
      dragging: true,
    });
    this.putPoint(e);
  }

  disengage() {
    if (this.state.dragging && this.context) {
      this.setState({
        dragging: false,
      });

      this.canvas.getContext('2d').beginPath();
    }
  }

  putPoint(e) {
    e.preventDefault();

    if (this.state.dragging && this.canvas) {
      const context = this.canvas.getContext('2d');
      context.lineTo(e.clientX, e.clientY);
      //context.lineTo(e.offsetX, e.offsetY);
      context.stroke();
      context.beginPath();
      context.arc(e.clientX, e.clientY, 10, 0, Math.PI * 2);
      //context.arc(e.offsetX, e.offsetY, radius, 0, Math.PI*2);
      context.fill();
      context.beginPath();
      context.moveTo(e.clientX, e.clientY);
      //context.moveTo(e.offsetX, e.offsetY);
    }
  }

  setColor(color) {
    if (this.canvas) {
      const context = this.canvas.getContext('2d');
      context.fillStyle = color;
      context.strokeStyle = color;
    }
  }

  handleMouseDown() {

  }

  handleMouseMove() {

  }

  handleMouseUp() {

  }

  handleMouseLeave() {

  }

  handleTouchStart() {

  }

  handleTouchMove() {

  }

  handleTouchEnd() {

  }

  render() {
    const canvasStyle = {
      display: 'block',
      width: window.innerWidth,
      height: window.innerHeight
    };

    return(
      <React.Fragment>
        <div id="toolbar">
          <div id="rad">
            Radius <span id="radval">10</span>
            <div id="decrad" className="radcontrol">-</div>
            <div id="incrad" className="radcontrol">+</div>
          </div>
          <div id="colors">
            {this.state.colors.map(color =>
              <div
                key={color}
                className="swatch"
                style={{backgroundColor: color}}
                onClick={() => {
                    this.setState({activeColor: color});
                    this.setColor(color);
                  }
                }
              />
            )}
          </div>
        </div>
        <canvas
          id="canvas"
          style={canvasStyle}
          ref={this.canvasRef}
          onMouseDown={this.engage}
          onMouseMove={this.putPoint}
          onMouseUp={this.disengage}
          onMouseOut={this.disengage}
          onTouchStart={this.engage}
          onTouchMove={this.putPoint}
          onTouchEnd={this.disengage}
          onTouchCancel={this.disengage}
        >
          Sorry, your browser is rubbish.
        </canvas>
      </React.Fragment>
    )
  }
}
