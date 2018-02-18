import React, { Component } from "react";
import { Field, reduxForm, getFormValues } from "redux-form";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentSave from "material-ui/svg-icons/content/save";
import PromotionMaintenanceFormTemplate from "./Template/PromotionMaintenanceFormTemplate";
import { ruleRequired, ruleMoreThanZero } from "../../commons/validateRules";
class PromotionHeaderEditForm extends Component {
  constructor(props) {
    super(props);
  }
  renderTextField = field => {
    const { meta: { touched, error } } = field;
    return (
      <div className="row">
        <div className="col-lg-12">
          <TextField
            {...field.input}
            floatingLabelText={field.floatingLabelText}
            type={field.type}
            className="full-width"
            disabled={field.disabled}
            errorText={touched ? error : ""}
          />
        </div>
      </div>
    );
  };

  renderSelectField = (field, dataSource) => {
    const { meta: { touched, error } } = field;
    return (
      <SelectField
        {...field.input}
        floatingLabelText={field.floatingLabelText}
        onChange={(event, index, value) => field.input.onChange(value)}
        className="full-width"
        errorText={touched ? error : ""}
      >
        {dataSource.map(item => {
          return <MenuItem value={item.value} primaryText={`${item.display}`} secondaryText={item.desc} />;
        })}
      </SelectField>
    );
  };

  render() {
    const { onSave, onBack, handleSubmit, valid } = this.props;
    return (
      <PromotionMaintenanceFormTemplate
        containerClassName="form-container"
        headerText="Promotion header entry"
        onBack={onBack}
        onSave={handleSubmit(values => onSave(values))}
        valid={valid}
        confirmMessage="Do you want to save promotion header"
      >
        <Field floatingLabelText="Id" name="id" component={this.renderTextField} disabled />
        <Field floatingLabelText="Header description" name="description" component={this.renderTextField} validate={[ruleRequired]} />
        <Field type="number" floatingLabelText="Discount value" name="discount_value" component={this.renderTextField} validate={[ruleRequired, ruleMoreThanZero]} />
        <Field
          floatingLabelText="Discount type"
          name="discount_type"
          component={field =>
            this.renderSelectField(field, [
              { display: "Percent", desc: "e.g discount 10% of price", value: "PERCENT" },
              { display: "Fixed value", desc: "e.g discount 100 bath from price", value: "FIXED" }
            ])
          }
          validate={[ruleRequired]}
        />
        <Field
          floatingLabelText="Group"
          name="promotion_group"
          component={field => this.renderSelectField(field, [{ display: "Group 1", value: 1 }, { display: "Group 2", value: 2 }])}
          validate={[ruleRequired]}
        />
      </PromotionMaintenanceFormTemplate>
    );
  }
}

const comp = reduxForm({ form: "promotionHeaderEditForm", enableReinitialize: true })(PromotionHeaderEditForm);
function mapStateToProps(state) {
  return {
    initialValues: state.promotionReducer.selectedPromotionHeader,
    formValues: getFormValues("promotionHeaderEditForm")(state)
  };
}

export default connect(mapStateToProps, null)(comp);
