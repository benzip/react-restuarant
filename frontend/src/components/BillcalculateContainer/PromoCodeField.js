import React, { Component } from "react";
import PropTypes from "prop-types";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import FloatingActionButton from "material-ui/FloatingActionButton";
import NavigationCheck from "material-ui/svg-icons/navigation/check";
import CircularProgress from "material-ui/CircularProgress";
class PromoCodeField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }
  onApplyPromotion = () => {
    const { onApplyPromotion } = this.props;
    onApplyPromotion();
  };
  render() {
    return (
      <div>
        <TextField
          type="text"
          floatingLabelText={this.props.floatingLabelText}
          style={{ width: "230px" }}
          onChange={(e, newValue) => this.props.onChange(newValue)}
          onFocus={e => this.props.onFocus()}
          onBlur={e => this.props.onBlur()}
          name={this.props.name}
        />
        <FloatingActionButton mini={true} backgroundColor="#218838" onClick={this.onApplyPromotion.bind(this)} tooltip="Apply">
          <NavigationCheck />
        </FloatingActionButton>
      </div>
    );
  }
}

export default PromoCodeField;
