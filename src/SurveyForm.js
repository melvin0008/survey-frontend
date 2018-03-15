import React, { Component } from "react";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import "jquery-ui/themes/base/all.css";
import "nouislider/distribute/nouislider.css";
import "select2/dist/css/select2.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";
import 'image-picker/image-picker/image-picker.css';

import "jquery-bar-rating/dist/themes/css-stars.css";

import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker.js";
import "select2/dist/js/select2.js";
import "jquery-bar-rating";

import * as widgets from "surveyjs-widgets";
import request from 'superagent';

widgets.icheck(Survey, $);
widgets.select2(Survey, $);
widgets.imagepicker(Survey, $);
widgets.inputmask(Survey);
widgets.jquerybarrating(Survey, $);
widgets.jqueryuidatepicker(Survey, $);
widgets.nouislider(Survey);
widgets.select2tagbox(Survey, $);
widgets.signaturepad(Survey);
widgets.sortablejs(Survey);
widgets.ckeditor(Survey);
widgets.autocomplete(Survey, $);
widgets.bootstrapslider(Survey);

class SurveyForm extends Component {

  constructor(props) {
    super(props);
    this.state = { json: {}, error: false };
    this.surveyid = this.props.match.params.surveyid;
  }

  componentDidMount(){
    request
      .get('http://127.0.0.1:8080/api/survey/' + this.surveyid)
      .then(res => {
        if (res.body[0]) {
          this.setState({ json: res.body[0].json })
        }
        else{
          this.setState({ error: true})
        }
      })
  }

  onValueChanged(result) {
    console.log("value changed!");
  }

  onComplete(result) {
    request
    .post('http://127.0.0.1:8080/api/result')
    .set('Accept', 'application/json')
    .send(JSON.stringify({ "survey_id": this.surveyid, "json": result.data }))
    .then(res => {
      let surveyId = this.surveyid

      this.props.history.push({
        pathname: '/reward',
        state: { survey_id: surveyId, completed: true }
      })
    })
  }

  render() {
    Survey.Survey.cssType = "bootstrap";
    let json = this.state.json;
    console.log(json)
    let json_empty = Object.keys(json).length === 0 && json.constructor === Object
    if (!json_empty) {
      var model = new Survey.Model(json);
      return (
        <div className="SurveyForm">
          <div className="surveyjs">
            <Survey.Survey model={model} onComplete={this.onComplete.bind(this)} onValueChanged={this.onValueChanged}/>
          </div>
        </div>
      );
    }
    if (this.state.error) {
      return (
        <div className="SurveyForm">
          Type in the correct Survey Id.
        </div>
      )
    }
    return (
      <div className="SurveyForm">
        Loading ...
      </div>
    )
  }
}

export default SurveyForm;