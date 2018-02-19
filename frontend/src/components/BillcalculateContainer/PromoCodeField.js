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
      loading: false,
      promoCode: null
    };
  }
  onApplyPromotion = () => {
    const { onApplyPromotion } = this.props;
    onApplyPromotion();
    this.props.onChange(null);
  };

  handleChange = (e, newValue) => {
    this.setState({ promoCode: newValue });
    this.props.onChange(newValue);
  };
  render() {
    return (
      <div>
        <TextField
          type="text"
          value={this.props.value}
          floatingLabelText={this.props.floatingLabelText}
          style={{ width: "230px" }}
          onChange={this.handleChange.bind(this)}
          onFocus={e => this.props.onFocus()}
          onBlur={e => this.props.onBlur()}
          name={this.props.name}
        />
        <FloatingActionButton mini={true} backgroundColor="#5cb85c" onClick={this.onApplyPromotion.bind(this)} tooltip="Apply" disabled={!this.props.value}>
          <NavigationCheck />
        </FloatingActionButton>
      </div>
    );
  }
}

export default PromoCodeField;
