import React, { Component } from "react";
import { Field, reduxForm, getFormValues } from "redux-form";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import PropTypes from "prop-types";
import Chip from "material-ui/Chip";
import PromotionChips from "./PromotionChips";
import CircularProgress from "material-ui/CircularProgress";
import PromoCodeField from "./PromoCodeField";
import { connect } from "react-redux";
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

  renderTextField = field => {
    return <TextField {...field.input} floatingLabelText={field.floatingLabelText} type={field.type} />;
  };

  applyPromotion = () => {
    const { onApplyPromotion } = this.props;
    console.log("applyPromotion", this.props.formValues);
    onApplyPromotion({ ...this.props.formValues });
  };

  renderPromotionCodeField = field => {
    return (
      <PromoCodeField
        {...field.input}
        onApplyPromotion={this.applyPromotion.bind(this)}
        floatingLabelText={field.floatingLabelText}
      />
    );
  };

  handleDelete = data => () => {};
  render() {
    const { stepIndex } = this.state;

    return (
      <div>
        <form>
          <div className="row">
            <div className="col-lg-8">
              <Field
                floatingLabelText="Number of seat"
                type="number"
                name="numberOfSeat"
                component={this.renderTextField}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <Field floatingLabelText="Unit price" type="number" name="unitPrice" component={this.renderTextField} />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <Field name="promotionCode" component={this.renderPromotionCodeField} />
            </div>
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
function mapStateToProps(state) {
  return {
    initialValues: { unitPrice: 459.0 },
    formValues: getFormValues("billCalculateForm")(state)
  };
}

export default connect(mapStateToProps, null)(comp);
