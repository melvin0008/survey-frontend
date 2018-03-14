import React, {Component} from "react";
import request from 'superagent';
import { u } from '@cityofzion/neon-js'

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      surveyId: props.location.state.survey_id,
      txId: '',
      depositSuccess: false,
      amount: 0,
      numberOfSurveyers: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let survey_id = this.state.surveyId;
    window.postMessage({
      type: 'NEOLINK_SEND_INVOKE',
      text: {
        scriptHash: '18f39545aaf1f42a7ecbe6e4d0dc7995c1f83dc6',
        operation: 'create_survey',
        arg1: u.str2hexstring(this.state.surveyId),
        arg2: u.num2hexstring(parseInt(this.state.numberOfSurveyers)),
        assetType: 'GAS',
        assetAmount: parseInt(this.state.amount),
      },
    }, '*')

    window.addEventListener('message', this.handleNeolinkResponse, false)
  }

  handleAmountChange = (e) => {
    this.setState({ amount: e.target.value })
  }

  handleNumberChange = (e) => {
    this.setState({ numberOfSurveyers: e.target.value })
  }

  handleNeolinkResponse = (event) => {
    if (event.data && event.data.type === 'NEOLINK_SEND_INVOKE_RESPONSE') {
      this.setState({
        txId: event.data.result.txid,
        depositSuccess: true,
      })
    }
  }

  componentWillUnmount() {
    clearTimeout(this.handleNeolinkResponse)
    window.removeEventListener('message', this.handleNeolinkResponse)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Number of surveyers you want to distribute GAS to
            <input type="text" value={this.state.numberOfSurveyers} onChange={this.handleNumberChange} />
          </label>
          <label>
            Amount of GAS to distribute to surveyers:
            <input type="text" value={this.state.amount} onChange={this.handleAmountChange} />
          </label>
          <input type="submit" value="Create Survey with GAS" />
        </form>
      </div>
    )
  }
}

export default Payment;
