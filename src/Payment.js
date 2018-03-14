import React, {Component} from "react";
import { u } from '@cityofzion/neon-js';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormGroup,
  ControlLabel,
} from 'react-bootstrap';


class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      surveyId: props.location.state.survey_id,
      txId: '',
      depositSuccess: false,
      amount: 0,
      numberOfSurveyers: 0,
      assetType: 'GAS',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    window.postMessage({
      type: 'NEOLINK_SEND_INVOKE',
      text: {
        scriptHash: '18f39545aaf1f42a7ecbe6e4d0dc7995c1f83dc6',
        operation: 'create_survey',
        arg1: u.str2hexstring(this.state.surveyId),
        arg2: u.num2hexstring(parseInt(this.state.numberOfSurveyers, 10)),
        assetType: this.state.assetType,
        assetAmount: parseInt(this.state.amount, 10),
      },
    }, '*')

    window.addEventListener('message', this.handleNeolinkResponse, false)
  }

  handleInputFocus = (event) => {
    event.target.select()
  }

  setAssetType(assetType) {
    this.setState({ assetType })
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
      <div style={divStyle}>
        <div  className="col-md-4 col-md-offset-4" style= {{marginTop: '40px'}}>
          <form>
            <FormGroup
              controlId='sendForm'
              style={ { 'minHeight': '100px' } }
            >
              <ControlLabel>Number of surveyers you want to distribute GAS to:</ControlLabel>
              <FormControl
                type='text'
                value={ this.state.amount }
                placeholder=''
                autoFocus
                onChange={ this.handleAmountChange }
                bsSize='large'
                className='text-center'
                style={inputStyle}
                onFocus={ this.handleInputFocus }
              />
              <hr style={{border: 'none'}}/>
              <ControlLabel>Amount of GAS to distribute to surveyers:</ControlLabel>
              <FormControl
                  type='text'
                  value={ this.state.numberOfSurveyers }
                  placeholder=''
                  onChange={ this.handleNumberChange }
                  bsSize='large'
                  className='text-center'
                  style={inputStyle}
                  onFocus={ this.handleInputFocus }
                />
            </FormGroup>

            <ButtonGroup justified>
              <Button
                href='#'
                onClick={ () => this.setAssetType('NEO') }
                active={ this.state.assetType === 'NEO' }
              >Send NEO</Button>
              <Button
                href='#'
                onClick={ () => this.setAssetType('GAS') }
                active={ this.state.assetType === 'GAS' }
              >Send GAS</Button>
            </ButtonGroup>

            <hr />

            <div className='button-container'>
              <Button
                bsSize='large'
                block
                onClick={ () => this.handleSubmit() }
              >Create Survey</Button>

            </div>
          </form>
        </div>
      </div>
    )
  }
}

const divStyle = {
  height: '100%',
  width: '100%',
  height: '100vh',
  width: '100vw',
  backgroundColor: '#f0f0f0',
};

const inputStyle = {
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid #000000',
  borderRadius: '0px',
  boxShadow: 'none',
}

export default Payment;
