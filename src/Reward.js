import React, {Component} from "react";
import request from 'superagent';
import {
  Button,
  FormControl,
  FormGroup,
  ControlLabel,
} from 'react-bootstrap';
import Background from './bg1.jpeg';

class Reward extends Component {
  constructor(props) {
    super(props);
    this.state = {value: '', rewarded: false};
    this.surveyid = props.location.state.survey_id;
    this.completed = props.location.state.completed;
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
    let reward_address = this.state.value;
    if (reward_address.length !== 34){
      alert("Enter an appropriate address")
      return;
    }
    request
    .post('http://127.0.0.1:8080/api/reward')
    .set('Accept', 'application/json')
    .send(JSON.stringify({ "survey_id": this.surveyid, "reward_address": this.state.value}))
    .then(res => {
      this.setState({ rewarded: true})
    })
  }

  render() {
    if(this.state.rewarded) {
      return (
        <div>
          
        </div>
      )
    }
    else if (this.completed) {
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
                >Get Rewarded</Button>
              </div>
            </form>
          </div>
        </div>
      );
    }
    return (
      <div style={divStyle}>
        <p>
          Please complete the Survey first
        </p>
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

export default Reward;
