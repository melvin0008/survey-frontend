import React, {Component} from "react";
import request from 'superagent';
import {
  Button,
  FormControl,
  FormGroup,
  ControlLabel,
} from 'react-bootstrap';
import Background from './bg1.jpeg';
import BalanceModal from "./BalanceModal";

class Balance extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.address || '', rewarded: false, balance: 0, modalShow: false};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleInputFocus = (event) => {
    event.target.select()
  }

  handleSubmit() {
    let address = this.state.value;
    if (address.length !== 34){
      alert("Enter an appropriate address")
      return;
    }
    request
    .get('http://127.0.0.1:8080/api/wallet/' + address)
    .set('Accept', 'application/json')
    .then(res => {
      if (res.body) {
        let balance = parseInt(res.body.balance, 10) / 100000000;
        this.setState({ balance: balance, modalShow: true });
        console.log(this.state)
      }
    })
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false });
    return (
      <div style={divStyle}>
        <div  className="col-md-4 col-md-offset-4" style= {{marginTop: '40px'}}>
          <form>
            <FormGroup
              controlId='sendForm'
              style={ { 'minHeight': '100px' } }
            >
              <ControlLabel> Enter your NEO Address: </ControlLabel>
              <FormControl
                type='text'
                value={ this.state.value }
                placeholder=''
                autoFocus
                onChange={ this.handleChange }
                bsSize='large'
                className='text-center'
                style={inputStyle}
                onFocus={ this.handleInputFocus }
              />
            </FormGroup>
            <div className='button-container'>
              <Button
                bsSize='large'
                block
                onClick={ () => this.handleSubmit() }
              >Check your Balance</Button>
            </div>
          </form>
        </div>
        <BalanceModal show={this.state.modalShow} onHide={modalClose} balance={this.state.balance}/>
      </div>
    );
  }
}

const divStyle = {
  height: '100%',
  width: '100%',
  height: '100vh',
  width: '100vw',
  backgroundImage: `url(${Background})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  backgroundSize: '100%',
};

const inputStyle = {
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid #000000',
  borderRadius: '0px',
  boxShadow: 'none',
}

const balanceStyle = {

}

export default Balance;
