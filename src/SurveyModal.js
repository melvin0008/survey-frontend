import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import {
  Button,
  FormGroup,
  FormControl,
  Modal
} from 'react-bootstrap';

class SurveyModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      value: "",
    };
    this.submitSurveyId = this.submitSurveyId.bind(this);
  }

  submitSurveyId(){
    this.props.history.push('/survey/' + this.state.value )
  }

  handleInputChange = (e) => {
    this.setState({ value: e.target.value })
  }

  handleInputFocus = (event) => {
    event.target.select()
  }

  render() {
    return (
      <Modal
        {...this.props}
        bsSize="large"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Please type in the survey id</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup
            controlId='sendForm'
            style={ { 'minHeight': '50px' } }
          >
            <FormControl
              type='text'
              value={ this.state.value }
              placeholder=''
              autoFocus
              onChange={ this.handleInputChange }
              bsSize='large'
              className='text-center'
              style={inputStyle}
              onFocus={ this.handleInputFocus }
            />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.submitSurveyId}>Take me to the survey</Button>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const inputStyle = {
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid #000000',
  borderRadius: '0px',
  boxShadow: 'none',
}

export default withRouter(SurveyModal);
