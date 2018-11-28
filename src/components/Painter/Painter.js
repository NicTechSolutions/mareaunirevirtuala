import React from 'react';
import CanvasDraw from 'react-canvas-draw';
import { disableBodyScroll } from 'body-scroll-lock';
import Cookies from 'universal-cookie';
import Slider from '@material-ui/lab/Slider';
import classNames from 'classnames';

import { withRouter } from 'react-router-dom';
import Constants from '../../constants/Constants';

import './Painter.css';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

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

    this.state = {
      activeColor: COLORS[0],
      activeBrushSize: 10,
      size: 10,
      toggleSizer: false,
    };
  }

  toRef(el) {
    this.canvas = el;
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    window.addEventListener("resize", this.updateDimensions.bind(this));

    this.updateDimensions();
    if (this.canvas) {
      let canvas = this.canvas.canvas;
      let context = canvas.getContext('2d');
      context.fillStyle = "red";
      context.fillRect(0, 0, canvas.width, canvas.height);
      console.log(context);
    }
  }

  updateDimensions() {
    if (this.canvasContainer) {
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
      var data = this.canvas.canvas.toDataURL('image/jpeg');
      axios.post(`${Constants.API_URL}/drawings/upload`, {
        drawing: data
      }).then(response => {
        NotificationManager.success("Imaginea s-a incarcat cu succes!");
        window.dispatchEvent(new Event("paint_done"));
      }, err => {
        NotificationManager.error("Eroare la incarcarea imaginii!");
      });
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

  onDrawing = () => {
    this.setState({ toggleSizer: false });
  }

  render() {
    return (
      <React.Fragment>
        <div className="container draw-container">
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
            onTouchStart={this.onDrawing}
            onClick={this.onDrawing}
            onDragStart={this.onDrawing}
          >
            <CanvasDraw
              ref={this.toRef}
              style={{ position: 'static' }}
              canvasWidth={this.state.canvasWidth}
              canvasHeight={this.state.canvasHeight}
              brushSize={this.state.activeBrushSize}
              brushColor={this.state.activeColor}
              gridColor="black"
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
