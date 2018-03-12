import React, {Component} from "react";
import request from 'superagent';

class Reward extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.surveyid = props.location.state.survey_id;
    this.completed = props.location.state.completed;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
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
      console.log(res);
    })
  }

  render() {
    if (this.completed) {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            NEO Address:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Get Rewarded" />
        </form>
      );
    }
    return (
      <div>
        <p>
          Please complete the Survey first
        </p>
      </div>
    )
  }
}

export default Reward;
