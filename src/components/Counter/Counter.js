import React from 'react';
import axios from 'axios';
import SettingsModal from '../SettingsModal';
import 'react-circular-progressbar/dist/styles.css';
import SegmentedProgressbar from './SegmentedProgressbar';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,

  TwitterIcon,
  LinkedinIcon,
  FacebookIcon
} from 'react-share';
import { withRouter } from 'react-router-dom';
import './Counter.css';

import Button from '../Button';
import Constants from '../../constants/Constants';
import Cookies from 'universal-cookie';

// const number = 66;

const milestones = [100, 1000, 10000, 100000, 1000000];

class Counter extends React.Component {
  cookies = new Cookies();
  constructor(props) {
    super(props);
    this.url = "https://mareaunirevirtuala.ro";
    this.title = "TRIMITE UN GAND BUN DE CENTENAR - Hai alaturi de mine si fii parte din unire #mareaunirevirtuala #romania #mozaicvirtual";
    this.titleTwitter = "Trimite un gand bun de Centenar - Hai alaturi de mine si fii parte din unire #mareaunirevirtuala #romania #mozaicvirtual";
    this.toggleModal = this.toggleModal.bind(this);
    this.navigateToPainter = this.navigateToPainter.bind(this);
    this.onUserPainted = this.onUserPainted.bind(this);
    this.logout = this.logout.bind(this);
    const hasPainting = this.cookies.get("user.has_painting") === "true" ? true : false;
    const paintingCount = Number(this.cookies.get("user.count"));
    window.addEventListener('paint_done', this.onUserPainted, false);
    console.log(hasPainting);

    this.state = {
      modalOpen: false,
      number: 0,
      hasPainting: hasPainting,
      paintingCount: paintingCount
    }
  }

  componentDidMount() {
    this.getCounter();
  }

  onUserPainted(ev) {
    this.cookies.set("user.has_painting", true);
    this.setState({
      hasPainting: true,
      paintingCount: Number(this.cookies.get("user.count"))
    });
  }

  getCounter() {
    axios.get(`${Constants.API_URL}/users/drawings/counter`)
      .then((response) => {
        this.setState({ number: response.data });
      }).catch((err) => {
        console.log(err);
      });
  }


  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen,
    })
  }

  logout() {
    this.cookies.remove('token');
    this.cookies.remove('user.has_painting');
    this.props.history.push('/');
  }

  navigateToPainter() {
    this.props.history.push('/painter');
  }

  render() {
    return (
      <div className="container">
        <div className="settings-button" onClick={this.toggleModal}></div>
        <div className="logout-button" onClick={this.logout}></div>
        <div className="counter" style={{ height: 200, width: 200, marginBottom: 20 }}>
          <SegmentedProgressbar
            percentage={(this.state.number / (milestones.find(m => m > this.state.number))) * 100}
            text={this.state.number}
          />
        </div>
        <p className="submit-text">Pana acum, {this.state.number} {this.state.number < 20 ? "" : "de"} romani au #desenat Romania asa cum si-au dorit!</p>
        {!this.state.hasPainting && <p className="submit-text">Foloseste culorile tricolorului si contribuie la cel mai mare mozaic virtual!</p>}
        {!this.state.hasPainting && <Button handleClick={this.navigateToPainter} buttonText="Creioneaza-ti gandul"></Button>}
        {this.state.hasPainting &&
          <div className="final-message">
            In scurt timp iti vei putea vedea desenul intr-un mod unic! Iti multumim pentru contributie,
            spune-le si prietenilor tai ca participi la cel mai mare mozaic virtual!
          </div>
        } {this.state.hasPainting && this.state.paintingCount < 10 &&
          <Button handleClick={this.navigateToPainter} buttonText="Creioneaza un nou gand"></Button>}

        <div className="social-media-container">
          <FacebookShareButton
            url={this.url}
            hashtag={"#mareaunirevirtuala"}
            quote={this.title}>
            <FacebookIcon size={36} round></FacebookIcon>
          </FacebookShareButton>
          <TwitterShareButton
            url={this.url}
            via={"mozaicvirtual"}
            title={this.titleTwitter + " " + this.url}>
            <TwitterIcon size={36} round></TwitterIcon>
          </TwitterShareButton>
          <LinkedinShareButton
            url={this.url}
            title={this.title}
            description={this.title}>
            <LinkedinIcon size={36} round></LinkedinIcon>
          </LinkedinShareButton>
        </div>
        <SettingsModal open={this.state.modalOpen} closeModal={this.toggleModal} />
      </div>
    );
  }
}

export default withRouter(Counter);
