import React, { Component } from "react";
import PropTypes from "prop-types";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
class PromoCodeField extends Component {
  constructor(props) {
    super(props);
  }
  handleClick = () => {
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
        <RaisedButton label="Apply" primary={true} onClick={this.handleClick.bind(this)} />
      </div>
    );
  }
}

export default PromoCodeField;
