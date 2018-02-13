import React, { Component } from "react";
import { connect } from "react-redux";
import * as PromotionActionCreators from "../actionCreators/promotionActionCreator";
import BillCalculateForm from "../components/BillcalculateContainer/BillCalculateForm";
import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";

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
    return (
      <div>
        <header className="panel_header">
          <h2 className="title pull-left">Bill calculator</h2>
        </header>

        <Divider />
        <div className="row">
          <div className="col-lg-5">
            <BillCalculateForm currentStep={stepIndex} stepDataSource={stepDataSource} />
          </div>
          <div className="col-lg-7" style={{ marginTop: "15px" }}>
            <Paper style={{ padding: "12px" }}>
              <div class="bd-callout bd-callout-warning">
                <h5 className="text-secondary">Calculate result</h5>
                <Divider />
                <p className="text-secondary" style={{ marginTop: "10px" }}>{`Total: 1,256.00`}</p>
                <p className="text-secondary">{`Discount: 200.00`}</p>
                <p className="text-secondary">{`Net: 1,056.00`}</p>
              </div>
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    promotionReducer: state.promotionReducer
  };
}

export default connect(mapStateToProps, {})(BillCalculateContainer);
