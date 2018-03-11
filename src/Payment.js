import React from "react";

function Payment(props) {
  return (
    <button className="square">
      Hi {props.location.state.survey_id}
    </button>
  );
}

export default Payment;
