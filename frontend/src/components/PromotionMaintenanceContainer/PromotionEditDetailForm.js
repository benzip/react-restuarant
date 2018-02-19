import React, { Component } from "react";
import { Field, reduxForm, getFormValues } from "redux-form";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import PromotionMaintenanceFormTemplate from "./Template/PromotionMaintenanceFormTemplate";
import { ruleRequired, ruleMoreThanZero } from "../../commons/validateRules";
class PromotionEditDetailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepIndex: this.props.currentStep || 0
    };
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
    const { headerId, onBack, onSave, handleSubmit, valid } = this.props;
    return (
      <PromotionMaintenanceFormTemplate
        containerClassName="form-container"
        headerText="Promotion detail entry"
        onBack={onBack}
        onSave={handleSubmit(values => onSave({ ...values, header_id: headerId }))}
        valid={valid}
        confirmMessage="Do you want to save promotion detail"
      >
        <Field floatingLabelText="Id" name="id" component={this.renderTextField} disabled />
        <Field floatingLabelText="Description" name="description" component={this.renderTextField} validate={[ruleRequired]} />
        <Field type="number" floatingLabelText="Bill value from" name="bill_value_from" component={this.renderTextField} validate={[ruleMoreThanZero]} />
        <Field type="number" floatingLabelText="Bill value to" name="bill_value_to" component={this.renderTextField} validate={[ruleMoreThanZero]} />
        <Field floatingLabelText="Promotion code" name="promo_code" component={this.renderTextField} />
        <Field type="number" floatingLabelText="Number of seat" name="number_of_seat" component={this.renderTextField} validate={[ruleMoreThanZero]} />
        <div className="col-lg-12" style={{ marginTop: "12px" }} />
      </PromotionMaintenanceFormTemplate>
    );
  }
}

const comp = reduxForm({ form: "promotionDetailEditForm", enableReinitialize: true })(PromotionEditDetailForm);
function mapStateToProps(state) {
  return {
    initialValues: { ...state.promotionReducer.selectedPromotionDetail },
    formValues: getFormValues("promotionDetailEditForm")(state),
    promotionReducer: state.promotionReducer
  };
}

export default connect(mapStateToProps, null)(comp);
