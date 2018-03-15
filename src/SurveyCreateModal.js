import React, { Component } from "react";
import {
  Modal,
} from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {SHARE_URL} from './Const';

class SurveyCreateModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      modalShow: false,
      copied: false
    };
    console.log(props)
  }

  onCopy() {
    this.setState({ copied: true })

    setTimeout(() => {
      this.setState({ copied: false })
    }, 5000)
  }

  selectSurveyUrl(event) {
    event.target.select()
  }


  render() {
    let surveyUrl = SHARE_URL + this.props.surveyId;
    console.log(surveyUrl);
    return (
      <Modal
        show={this.props.modalShow}
        onHide={this.props.onHide}
        bsSize="large"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Survey Created</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={divStyle}>
            <p>
            You have successfully created a survey with id <strong>{this.props.surveyId}</strong>
            </p><p>
            Transaction Id: <strong>{this.props.txId}</strong>
            </p><p>
            Your survey will be taken by <strong>{this.props.numberOfSurveyers}</strong> people.
            </p>
            <hr/>
            Share the following link so that people can fill in surveys and you can get the feedback you need.
            <p>
            </p>
            <div className='input-group' style={{ padding: '10px', paddingLeft: '0px'}}>
              <input
                type='text'
                className='form-control'
                onClick={ this.selectSurveyUrl.bind(this) }
                readOnly
                value={ surveyUrl } />

              <CopyToClipboard text={ surveyUrl } onCopy={ () => this.onCopy() } >
                <span className='input-group-addon'>
                  <i className='fa fa-fw fa-clipboard' />
                </span>
              </CopyToClipboard>
            </div>
            { this.state.copied && <div className='text-right'>Copied to Clipboard</div> }
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

const divStyle = {
  fontSize: '18px',
}


export default SurveyCreateModal;
