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
import SwipeableViews from "react-swipeable-views";
import FloatingActionButton from "material-ui/FloatingActionButton";
import NavigationArrowBack from "material-ui/svg-icons/navigation/arrow-back";
import { ruleRequired, ruleMoreThanZero } from "../../commons/validateRules";
import numeral from "numeral";

class BillCalculateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepIndex: this.props.currentStep || 0
    };
  }
  renderTextField = field => {
    const { meta: { touched, error } } = field;
    return (
      <TextField
        {...field.input}
        floatingLabelText={field.floatingLabelText}
        type={field.type}
        className="full-width"
        disabled={field.disabled}
        errorText={touched ? error : ""}
      />
    );
  };
  applyPromotion = () => {
    const { onApplyPromotion } = this.props;
    onApplyPromotion({ ...this.props.formValues });
  };
  renderPromotionCodeField = field => {
    return <PromoCodeField {...field.input} onApplyPromotion={this.applyPromotion} floatingLabelText={field.floatingLabelText} />;
  };
  renderStep1 = () => {
    return (
      <div>
        <div className="row">
          <div className="col-lg-4">
            <Field floatingLabelText="Number of seat" type="number" name="numberOfSeat" component={this.renderTextField} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4">
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
          <div className="col-lg-12">{appliedPromotions.length > 0 ? <PromotionChips appliedPromotions={appliedPromotions} /> : "No applied promotion"}</div>
        </div>
      </div>
    );
  };

  renderStep3 = () => {
    const { calculateResult } = this.props;
    if (calculateResult) {
      return (
        <div>
          <dl className="row">
            <dt class="col-lg-3">Total</dt>
            <dd class="col-lg-3 number">{numeral(calculateResult.totalAmount).format("0,0.00")}</dd>
          </dl>
          <dl className="row">
            <dt class="col-lg-3">Discount</dt>
            <dd class="col-lg-3 number">{numeral(calculateResult.discount).format("0,0.00")}</dd>
          </dl>
          <dl className="row">
            <dt class="col-lg-3">Net</dt>
            <dd class="col-lg-3 number bold text-primary">{numeral(calculateResult.netAmount).format("0,0.00")}</dd>
          </dl>
        </div>
      );
    } else {
      return <div />;
    }
  };

  handleNext = () => {
    const { handleNext, formValues } = this.props;
    handleNext(formValues);
  };

  render() {
    const { handleNext, handleBack, currentStep, valid } = this.props;
    const stepDataSource = [
      {
        stepIndex: 0,
        stepLabel: "Enter seat"
      },
      {
        stepIndex: 1,
        stepLabel: "Apply promotion"
      },
      {
        stepIndex: 2,
        stepLabel: `Tell your customer`
      }
    ];
    return (
      <form>
        <HorizontalLinearStepper currentStep={currentStep} stepDataSource={stepDataSource} />
        <div className="bill-calc-swipe col-lg-12">
          <SwipeableViews index={currentStep}>
            {this.renderStep1()}
            {this.renderStep2()}
            {this.renderStep3()}
          </SwipeableViews>
        </div>
        <div className="row">
          <div className="col-lg-12" style={{ marginTop: "12px" }}>
            <RaisedButton label="Back" onClick={() => handleBack()} disabled={currentStep == 0} />
            <RaisedButton
              label={currentStep == 2 ? "Done" : currentStep == 3 ? "Reset" : "Next"}
              primary={true}
              onClick={this.handleNext.bind(this)}
              style={{ marginLeft: "12px" }}
              disabled={!valid}
            />
          </div>
        </div>
      </form>
    );
  }
}

const validate = (values, { currentStep }) => {
  const errors = {};
  if (currentStep == 0) {
    errors.numberOfSeat = ruleRequired(values.numberOfSeat) || ruleMoreThanZero(values.numberOfSeat);
    errors.unitPrice = ruleRequired(values.unitPrice) || ruleMoreThanZero(values.unitPrice);
  }
  return errors;
};

const comp = reduxForm({ form: "billCalculateForm", enableReinitialize: true, validate })(BillCalculateForm);
function mapStateToProps(state) {
  return {
    initialValues: { unitPrice: 459.0 },
    formValues: getFormValues("billCalculateForm")(state)
  };
}

// override the validate

export default connect(mapStateToProps, null)(comp);
