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
import HorizontalLinearStepper from "../HorizontalLinearStepper";
import Divider from "material-ui/Divider";

class BillCalculateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepIndex: this.props.currentStep || 0
    };
  }

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

  renderStep1 = () => {
    return (
      <div>
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
      </div>
    );
  };

  renderStep2 = () => {
    const { appliedPromotions } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-lg-8">
            <Field floatingLabelText="Promotion Code" name="promotionCode" component={this.renderPromotionCodeField} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <PromotionChips appliedPromotions={appliedPromotions} />
          </div>
        </div>
      </div>
    );
  };

  renderStep3 = () => {
    return (
      <div className="row">
        <div className="col-lg-7" style={{ marginTop: "15px" }}>
          <div className="bd-callout bd-callout-warning">
            <h5 className="text-secondary">Calculate result</h5>
            <Divider />
            <p className="text-secondary" style={{ marginTop: "10px" }}>{`Total: 1,256.00`}</p>
            <p className="text-secondary">{`Discount: 200.00`}</p>
            <p className="text-secondary">{`Net: 1,056.00`}</p>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { handleNext, handleBack, currentStep } = this.props;

    const stepDataSource = [
      {
        stepIndex: 0,
        stepLabel: "Enter seat",
        stepContent: this.renderStep1
      },
      {
        stepIndex: 1,
        stepLabel: "Apply promotion",
        stepContent: this.renderStep2
      },
      {
        stepIndex: 2,
        stepLabel: `Tell your customer`,
        stepContent: this.renderStep3
      }
    ];

    return (
      <div>
        <form>
          <HorizontalLinearStepper
            currentStep={currentStep}
            stepDataSource={stepDataSource}
            style={{ height: "700px" }}
          />
          <div className="col-lg-12" style={{ marginTop: "12px" }}>
            <RaisedButton label="Back" onClick={() => handleBack()} />
            <RaisedButton label="Next" primary={true} onClick={() => handleNext({ ...this.props.formValues })} />
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
