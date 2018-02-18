import React, { Component } from "react";
import { Field, reduxForm, getFormValues } from "redux-form";
import TextField from "material-ui/TextField";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import HorizontalLinearStepper from "../HorizontalLinearStepper";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import PromotionMaintenanceTemplate from "./PromotionMaintenanceTemplate";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentSave from "material-ui/svg-icons/content/save";
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
    const { headerId, onBack, onSave } = this.props;
    return (
      <form>
        <PromotionMaintenanceTemplate containerClassName="list-view-container" headerText="Promotion detail list" onBack={onBack}>
          <Field floatingLabelText="Id" name="id" component={this.renderTextField} disabled />
          <Field floatingLabelText="Description" name="description" component={this.renderTextField} />
          <Field type="number" floatingLabelText="Bill value from" name="bill_value_from" component={this.renderTextField} />
          <Field type="number" floatingLabelText="Bill value to" name="bill_value_to" component={this.renderTextField} />
          <Field floatingLabelText="Promotion code" name="promo_code" component={this.renderTextField} />
          <Field type="number" floatingLabelText="Number of seat" name="number_of_seat" component={this.renderTextField} />
          <div className="col-lg-12" style={{ marginTop: "12px" }} />
        </PromotionMaintenanceTemplate>
      </form>
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
