import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import PropTypes from "prop-types";
import Chip from "material-ui/Chip";
import PromotionChips from "./PromotionChips";
import CircularProgress from "material-ui/CircularProgress";
import PromoCodeField from "./PromoCodeField";
class BillCalculateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepIndex: this.props.currentStep || 0
    };
  }

  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2
    });
  };

  handleDelete = data => () => {};
  render() {
    const { stepIndex } = this.state;
    const { onApplyPromotion } = this.props;

    return (
      <div>
        <form>
          <div className="row">
            {" "}
            <div className="col-lg-8">
              <TextField type="number" floatingLabelText="Number of customer" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <TextField type="number" value={459.0} floatingLabelText="Unit price" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <PromoCodeField onApplyPromotion={onApplyPromotion} />
              {/* <TextField
                type="text"
                floatingLabelText="Promotion code"
                onChange={this.onApplyPromotion.bind(this)}
                style={{ width: "90%" }}
              />
              <CircularProgress
                style={{ position: "absolute", bottom: "12px", float: "left" }}
                size={20}
                thickness={2}
              /> */}
            </div>
            {/* <div className="col-lg-2">
              <CircularProgress style={{ position: "absolute", bottom: "12px" }} size={20} thickness={2} />
            </div> */}
          </div>
          <div className="row">
            <div className="col-lg-8">
              <PromotionChips />
            </div>
          </div>
          <div className="col-lg-8" style={{ marginTop: "12px" }}>
            <RaisedButton label="Calculate" primary={true} onClick={this.handleNext.bind(this)} />
          </div>
        </form>
      </div>
    );
  }
}

const comp = reduxForm({ form: "billCalculateForm", enableReinitialize: true })(BillCalculateForm);
export default comp;
