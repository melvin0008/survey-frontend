import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Payment from './Payment'
import * as Survey from "survey-react";
import "survey-react/survey.css";
import SurveyEditor from "./SurveyEditor";
import SurveyForm from "./SurveyForm";
import Reward from "./Reward";
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

class App extends Component {
  render() {
    Survey.Survey.cssType = "bootstrap";
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path='/' component={SurveyEditor}/>
            <Route path='/payment' component={Payment}/>
            <Route path='/survey/:surveyid' component={SurveyForm}/>
            <Route path='/reward' component={Reward}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
