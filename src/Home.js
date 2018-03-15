import React, {Component} from "react";
import { withRouter } from 'react-router-dom';

import Background from './bg.jpeg';
import {
  Button,
} from 'react-bootstrap';

import SurveyModal from './SurveyModal';
import './Home.css';

class Home extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      modalShow: false,
    };
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false });
    return (
      <div style={divStyle}>
        <div style={headerStyle}>
          Survey Token
        </div>
        <div style={buttonDivStyle}>
          <Button
            href='#'
            onClick={ () => this.props.history.push('/editor') }
            bsClass='surButton'
            bsSize='large'
          >Create a Survey</Button>

          <Button
            href='#'
            onClick={ () => this.setState({ modalShow: true }) }
            bsClass='surButton'
            bsSize='large'
          >Take a Survey</Button>
        </div>
        <SurveyModal  show={this.state.modalShow} onHide={modalClose}/>
      </div>
    )
  }
}

const divStyle = {
  height: '100%',
  width: '100%',
  height: '100vh',
  width: '100vw',
  backgroundImage: `url(${Background})`,
};

const buttonDivStyle = {
  position: 'fixed',
  bottom: '15%',
  left: '35%',
}

const headerStyle = {
  position: 'fixed',
  fontSize: '45px',
  color: 'white',
  left: '80%',
  top: '2%',
}

export default withRouter(Home);