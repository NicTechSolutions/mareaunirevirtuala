import React from 'react';
import CanvasDraw from 'react-canvas-draw';
import { disableBodyScroll } from 'body-scroll-lock';
import Cookies from 'universal-cookie';
import Slider from '@material-ui/lab/Slider';
import classNames from 'classnames';

import { withRouter } from 'react-router-dom';
import Constants from '../../constants/Constants';

import './Painter.css';

const COLORS = ['#CE1126', '#FCD116', '#002B7F'];

class Painter extends React.Component {

  cookies = new Cookies();

  constructor(props) {
    super(props);

    this.toRef = this.toRef.bind(this);
    disableBodyScroll(this.toRef);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.saveDrawing = this.saveDrawing.bind(this);
    this.undo = this.undo.bind(this);
    this.canvasHeight = null;
    this.canvasWidth = null;

    this.state = {
      activeColor: COLORS[0],
      activeBrushSize: 10,
      size: 10,
      toggleSizer: false,
      toggleColors: false,
    };
  }

  toRef(el) {
    this.canvas = el;
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions.bind(this));

    this.updateDimensions();


    if (this.canvas) {
      let canvas = this.canvas.canvas;
      let context = canvas.getContext('2d');
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
  }

  updateDimensions() {
    if (this.canvasContainer.clientHeight > this.canvasContainer.clientWidth) {
      this.canvasHeight = this.canvasContainer.clientWidth - 50;
      this.canvasWidth = this.canvasContainer.clientWidth;
    } else {
      this.canvasHeight = this.canvasContainer.clientHeight - 50;
      this.canvasWidth = this.canvasContainer.clientHeight;
    }

    this.setState({
      canvasHeight: this.canvasHeight,
      canvasWidth: this.canvasWidth
    });
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
      window.drawingUrl = this.canvas.canvas.toDataURL('image/jpeg');
      var data = this.canvas.canvas.toDataURL('image/jpeg');
      var token = this.cookies.get('token');
      var request = new XMLHttpRequest();

      request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
          //do our stuff
          var response = request.responseText;
        }
      };

      request.open('POST', `${Constants.API_URL}/drawings/upload`, true);
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      request.setRequestHeader('Authorization', 'Bearer ' + token);
      request.send('drawing=' + data);
      this.props.history.push('/counter');
    }
  }

  onChange = (evt, value) => {
    if (value) {
        this.setState({
        activeBrushSize: value
      });
    }

  }

  onToggleSizer = () => {
    this.setState({
      toggleSizer: !this.state.toggleSizer
    })
  }

  onToggleColors = () => {
    console.log("togglings colors");
    this.setState({
      toggleColors: !this.state.toggleColors
    })
  }

  render() {
    return (
      <React.Fragment>
        <div className="draw-container" >
          <div className="header">
            <div className="colors">
              {COLORS.map(color => (
                <div key={color} className={classNames('swatch', { active: color === this.state.activeColor })}
                  style={{ backgroundColor: color }}
                  onClick={() => this.setState({ activeColor: color })} />
              ))}
            </div>
            <div className="popover">
              <div className="pencil-drop-icon" onClick={this.onToggleSizer}></div>
              {
                this.state.toggleSizer &&
                <div className="popover-content">
                  <div className="slider-container">
                    <Slider
                      value={this.state.activeBrushSize}
                      onChange={this.onChange}
                      color={`${this.state.activeColor}`}
                      >
                    </Slider>
                  </div>
                </div>

              }
            </div>

          </div>
          <div className="drawing-canvas-container"
            ref={(divElement) => this.canvasContainer = divElement}
            onTouchStart={() => this.setState({ toggleColors: false, toggleSizer: false })}>
            <CanvasDraw
              ref={this.toRef}
              style={{ position: 'static' }}
              canvasWidth={this.state.canvasWidth}
              canvasHeight={this.state.canvasHeight}
              brushSize={this.state.activeBrushSize}
              brushColor={this.state.activeColor}
            />
          </div>
          <div className="button-bar" onClick={this.undo}>
            <div className="draw-button ">
              <div className="reset-button"></div>
              Anuleaza
            </div>
            <div className="separator"></div>

            <div className="draw-button" onClick={this.clearCanvas}>
              <div className="delete-button"></div>
              <div>Sterge</div>
            </div>
            <div className="separator"></div>

            <div className="draw-button" onClick={this.saveDrawing}>
              <div className="send-button"></div>
              Trimite
            </div>
          </div>
        </div>
      </React.Fragment >
    );
  }
}

export default withRouter(Painter);
