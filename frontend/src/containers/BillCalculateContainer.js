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

    console.log(formValues);

    //Entry seat and unit price (validate)
    if (stepIndex == 0) {
      //Entry promotion code
      this.props.findPromotions({
        billValue: parseInt(formValues.numberOfSeat || 0) * parseFloat(formValues.unitPrice || 0),
        promotionCode: formValues.promotionCode || "",
        numberOfSeat: parseInt(formValues.numberOfSeat || 0)
      });

      setTimeout(() => {
        if (this.props.promotionReducer.findResults.length > 0) {
          this.setState({ appliedPromotions: appliedPromotions.concat(promotionReducer.findResults.data) });
        }
      });
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

  onApplyPromotion = formData => {
    const { findPromotions } = this.props;
    console.log("formData", formData);
    findPromotions({
      billValue: formData.numberOfSeat || 0 * formData.unitPrice || 0,
      promotionCode: formData.promotionCode || "",
      numberOfSeat: formData.numberOfSeat || 0
    });
  };

  render() {
    const { stepIndex, appliedPromotions } = this.state;
    const onApplyPromotionDebounce = _.debounce(formData => this.onApplyPromotion(formData), 3000);
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
              onApplyPromotion={onApplyPromotionDebounce}
              appliedPromotions={appliedPromotions}
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

// function mapDispatchToProp(dispatch) {
//   return bindActionCreators({ findPromotions: PromotionActionCreators.findPromotions }, dispatch);
// }

export default connect(mapStateToProps, {
  findPromotions: PromotionActionCreators.viewActions.findPromotions
})(BillCalculateContainer);
