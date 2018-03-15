import React, { Component } from "react";
import {
  Modal,
} from 'react-bootstrap';

class BalanceModal extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    console.log(this.props);
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        bsSize="large"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Your Balance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={divStyle}>
            Your current balance is {this.props.balance} SUR
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

const divStyle = {
  fontSize: '18px',
}


export default BalanceModal;
