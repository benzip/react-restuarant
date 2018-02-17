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

  componentDidMount() {}
  handleNext = formValues => {
    const { stepIndex, appliedPromotions } = this.state;
    const { findPromotions, promotionReducer } = this.props;
    //Entry seat and unit price (validate)
    if (stepIndex == 0) {
      //Entry promotion code
      this.findAndApplyPromotions(formValues);
    } else if (stepIndex == 1) {
    } else if (stepIndex == 2) {
    }
    this.setState({
      stepIndex: stepIndex + 1
    });
  };

  handleBack = formValues => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({
        stepIndex: stepIndex - 1
      });
    }
  };

  findAndApplyPromotions = formData => {
    const { findAndApplyPromotions, promotionReducer } = this.props;
    const { appliedPromotions } = promotionReducer;
    console.log("formData", formData);
    findAndApplyPromotions({
      billValue: parseInt(formData.numberOfSeat || 0) * parseFloat(formData.unitPrice || 0),
      promotionCode: formData.promotionCode || "",
      numberOfSeat: parseInt(formData.numberOfSeat || 0),
      promotions: appliedPromotions
    });
  };

  render() {
    const { appliedPromotions, calculateResult } = this.props.promotionReducer;
    const { stepIndex } = this.state;
    console.log("appliedPromotions", appliedPromotions);
    return (
      <div>
        <header className="panel_header">
          <h2 className="title pull-left">Bill calculator</h2>
        </header>
        <div className="row">
          <div className="col-lg-12">
            <BillCalculateForm
              handleNext={this.handleNext.bind(this)}
              handleBack={this.handleBack.bind(this)}
              currentStep={stepIndex}
              onApplyPromotion={this.findAndApplyPromotions.bind(this)}
              appliedPromotions={appliedPromotions}
              calculateResult={calculateResult}
            />
          </div>
        </div>
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
  findPromotions: PromotionActionCreators.viewActions.findPromotions,
  applyPromotions: PromotionActionCreators.viewActions.applyPromotions,
  findAndApplyPromotions: PromotionActionCreators.viewActions.findAndApplyPromotions
})(BillCalculateContainer);
