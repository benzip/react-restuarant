import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as PromotionActionCreators from "../actionCreators/promotionActionCreator";
import BillCalculateForm from "../components/BillcalculateContainer/BillCalculateForm";
import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";
import _ from "lodash";
import { getFormValues } from "redux-form";
class BillCalculateContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepIndex: 0,
      appliedPromotions: []
    };
  }

  handleNext = formValues => {
    const { stepIndex } = this.state;
    if (stepIndex == 0) {
      this.findAndApplyPromotions({ ...formValues, promotionCode: null }, true);
      this.setState({
        stepIndex: stepIndex + 1
      });
    } else if (stepIndex == 3) {
      this.setState({
        stepIndex: 0
      });
    } else {
      this.setState({
        stepIndex: stepIndex + 1
      });
    }
  };

  handleBack = formValues => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({
        stepIndex: stepIndex - 1
      });
    }
  };

  findAndApplyPromotions = (formData, reset) => {
    const { findAndApplyPromotions, promotionReducer } = this.props;
    const { appliedPromotions } = promotionReducer;
    findAndApplyPromotions({
      billValue: parseInt(formData.numberOfSeat || 0) * parseFloat(formData.unitPrice || 0),
      promotionCode: formData.promotionCode || "",
      numberOfSeat: parseInt(formData.numberOfSeat || 0),
      promotions: appliedPromotions,
      reset: reset
    });
  };

  render() {
    const { appliedPromotions, calculateResult } = this.props.promotionReducer;
    const { stepIndex } = this.state;
    return (
      <div>
        <header className="panel_header">
          <h2 className="title pull-left">Bill calculator</h2>
        </header>
        <BillCalculateForm
          handleNext={this.handleNext.bind(this)}
          handleBack={this.handleBack.bind(this)}
          currentStep={stepIndex}
          onApplyPromotion={this.findAndApplyPromotions.bind(this)}
          appliedPromotions={appliedPromotions}
          calculateResult={calculateResult}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    promotionReducer: state.promotionReducer,
    formValues: getFormValues("billCalculateForm")(state)
  };
}

export default connect(mapStateToProps, {
  findAndApplyPromotions: PromotionActionCreators.viewActions.findAndApplyPromotions
})(BillCalculateContainer);
