import React, { Component } from "react";
import { Field, reduxForm, getFormValues } from "redux-form";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import HorizontalLinearStepper from "../HorizontalLinearStepper";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

class PromotionEditDetailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepIndex: this.props.currentStep || 0
    };
  }

  renderTextField = field => {
    return (
      <div className="row">
        <div className="col-lg-12">
          <TextField {...field.input} floatingLabelText={field.floatingLabelText} type={field.type} className="full-width" disabled={field.disabled} />
        </div>
      </div>
    );
  };

  renderSelectField = (field, dataSource) => {
    return (
      <SelectField {...field.input} floatingLabelText={field.floatingLabelText} onChange={(event, index, value) => field.input.onChange(value)} className="full-width">
        {dataSource.map(item => {
          return <MenuItem value={item.value} primaryText={`${item.display}`} secondaryText={item.desc} />;
        })}
      </SelectField>
    );
  };

  render() {
    return (
      <div>
        <form>
          <Field floatingLabelText="Id" name="id" component={this.renderTextField} disabled />
          <Field floatingLabelText="Header description" name="description" component={this.renderTextField} />
          <Field floatingLabelText="Discount value" name="discount_value" component={this.renderTextField} />
          <Field
            floatingLabelText="Discount type"
            name="discount_type"
            component={field =>
              this.renderSelectField(field, [
                { display: "Percent", desc: "e.g discount 10% of price", value: "PERCENT" },
                { display: "Fixed value", desc: "e.g discount 100 bath from price", value: "FIXED" }
              ])
            }
          />
          <Field floatingLabelText="Group" name="promotion_group" component={field => this.renderSelectField(field, [{ display: "Group 1", value: 1 }, { display: "Group 2", value: 2 }])} />

          <div className="col-lg-12" style={{ marginTop: "12px" }}>
            <RaisedButton label="Back" onClick={() => this.props.onBack()} />
            <RaisedButton label="Save" primary={true} onClick={() => this.props.onSave()} />
          </div>
        </form>
      </div>
    );
  }
}

const comp = reduxForm({ form: "promotionEditForm", enableReinitialize: true })(PromotionEditDetailForm);
function mapStateToProps(state) {
  return {
    initialValues: state.promotionReducer.selectedPromotion,
    formValues: getFormValues("promotionEditForm")(state)
  };
}

export default connect(mapStateToProps, null)(comp);
