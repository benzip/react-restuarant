import React, { Component } from "react";
import { connect } from "react-redux";
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
      promotions: null,
      stepIndex: 0
    };
  }

  componentDidMount() {}
  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2
    });
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
    const stepDataSource = [
      {
        stepIndex: 0,
        stepLabel: "Select campaign settings"
      },
      {
        stepIndex: 1,
        stepLabel: "Create an ad group"
      },
      {
        stepIndex: 2,
        stepLabel: "Create an ad"
      }
    ];

    const { stepIndex } = this.state;
    const onApplyPromotionDebounce = _.debounce(formData => this.onApplyPromotion(formData), 1500);
    return (
      <div>
        <header className="panel_header">
          <h2 className="title pull-left">Bill calculator</h2>
        </header>

        <Divider />
        <div className="row">
          <div className="col-lg-5">
            <BillCalculateForm
              currentStep={stepIndex}
              stepDataSource={stepDataSource}
              onApplyPromotion={onApplyPromotionDebounce}
            />
          </div>
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
  findPromotions: PromotionActionCreators.findPromotions
})(BillCalculateContainer);
