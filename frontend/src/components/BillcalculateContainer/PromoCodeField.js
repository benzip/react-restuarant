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

  handleChange = () => {
    const { onApplyPromotion } = this.props;
    this.setState({ loading: true });
    onApplyPromotion();
    setTimeout(() => this.setState({ loading: false }), 2000);
  };
  render() {
    const { loading } = this.state;
    return (
      <div>
        <TextField
          type="text"
          floatingLabelText="Promotion code"
          onChange={this.handleChange.bind(this)}
          style={loading ? { width: "90%" } : {}}
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
