import React, { Component } from "react";
import PropTypes from "prop-types";
import TextField from "material-ui/TextField";
import CircularProgress from "material-ui/CircularProgress";

class PromoCodeField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  handleChange = (e, newValue) => {
    const { onApplyPromotion } = this.props;
    this.props.onChange(newValue); // send to redux form
    this.setState({ loading: true });
    // waiting redux-form update the value
    setTimeout(() => {
      onApplyPromotion();
      this.setState({ loading: false });
    });
  };
  render() {
    const { loading } = this.state;
    return (
      <div>
        <TextField
          type="text"
          floatingLabelText={this.props.floatingLabelText}
          style={loading ? { width: "230px" } : {}}
          onChange={this.handleChange.bind(this)}
          onFocus={e => this.props.onFocus()}
          onBlur={e => this.props.onBlur()}
          name={this.props.name}
        />
        <CircularProgress
          style={{
            position: "absolute",
            bottom: "12px",
            float: "left",
            display: this.state.loading ? "inline-block" : "none"
          }}
          size={20}
          thickness={2}
        />
      </div>
    );
  }
}

export default PromoCodeField;
