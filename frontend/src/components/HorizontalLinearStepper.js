import React from "react";
import PropTypes from "prop-types";
import { Step, Stepper, StepLabel } from "material-ui/Stepper";

class HorizontalLinearStepper extends React.Component {
  render() {
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
