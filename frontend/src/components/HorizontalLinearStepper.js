import React from "react";
import PropTypes from "prop-types";
import { Step, Stepper, StepLabel } from "material-ui/Stepper";
import SwipeableViews from "react-swipeable-views";

class HorizontalLinearStepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: this.props.currentStep
    };
  }
  renderSteps() {
    return (
      <Stepper activeStep={this.props.currentStep}>
        {this.props.stepDataSource.map(item => (
          <Step key={item.stepIndex}>
            <StepLabel>{item.stepLabel}</StepLabel>
          </Step>
        ))}
      </Stepper>
    );
  }
  renderSwipeViews() {
    const { stepDataSource } = this.props;
    return (
      <SwipeableViews index={this.props.currentStep}>{stepDataSource.map(item => item.stepContent())}</SwipeableViews>
    );
  }

  render() {
    const { finished, stepIndex } = this.state;
    const contentStyle = { margin: "0 16px" };
    return (
      <div style={{ width: "100%", maxWidth: 700, margin: "auto" }}>
        {this.renderSteps()}
        {this.renderSwipeViews()}
        {this.props.children}
      </div>
    );
  }
}

HorizontalLinearStepper.propTypes = {
  stepDataSource: PropTypes.arrayOf(
    PropTypes.shape({
      stepIndex: PropTypes.number.isRequired,
      stepLabel: PropTypes.string.isRequired
    })
  ).isRequired,
  currentStep: PropTypes.number
};

export default HorizontalLinearStepper;
