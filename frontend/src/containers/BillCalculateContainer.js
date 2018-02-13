import React, { Component } from "react";
import { connect } from "react-redux";
import * as PromotionActionCreators from "../actionCreators/promotionActionCreator";
import RaisedButton from "material-ui/RaisedButton";
import HorizontalLinearStepper from "../components/HorizontalLinearStepper";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";

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
    const { promotions } = this.props.promotionReducer;
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

    if (promotions) {
      const { stepIndex } = this.state;
      return (
        <div>
          <header className="panel_header">
            <h2 className="title pull-left">Bill calculator</h2>
          </header>
          <HorizontalLinearStepper stepDataSource={stepDataSource} currentStep={stepIndex}>
            <form>
              <div className="col-lg-12">
                <TextField type="number" floatingLabelText="Number of customer" />
              </div>
              <div className="col-lg-12">
                <TextField type="number" value={499.0} floatingLabelText="Unit price" />
              </div>
              <FlatButton
                label="Back"
                disabled={stepIndex === 0}
                onClick={this.handlePrev}
                style={{ marginRight: 12 }}
              />
              <RaisedButton
                label={stepIndex === 2 ? "Finish" : "Next"}
                primary={true}
                onClick={this.handleNext.bind(this)}
              />
            </form>
          </HorizontalLinearStepper>
          <ul>{promotions.map(promotion => <li key={promotion.id}>{promotion.description}</li>)}</ul>
        </div>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

function mapStateToProps(state) {
  return {
    promotionReducer: state.promotionReducer
  };
}

export default connect(mapStateToProps, {})(BillCalculateContainer);
