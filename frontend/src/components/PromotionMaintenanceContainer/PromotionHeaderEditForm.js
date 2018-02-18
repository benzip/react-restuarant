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
import PromotionMaintenanceTemplate from "./PromotionMaintenanceTemplate";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentSave from "material-ui/svg-icons/content/save";

class PromotionHeaderEditForm extends Component {
  constructor(props) {
    super(props);
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
    const { onSave, onBack } = this.props;
    return (
      <form>
        <PromotionMaintenanceTemplate
          containerClassName="form-container"
          headerText="Promotion header entry"
          onBack={onBack}
          toolbarComponent={
            <FloatingActionButton onClick={() => onSave({ ...this.props.formValues })} mini={true}>
              <ContentSave />
            </FloatingActionButton>
          }
        >
          <Field floatingLabelText="Id" name="id" component={this.renderTextField} disabled />
          <Field floatingLabelText="Header description" name="description" component={this.renderTextField} />
          <Field type="number" floatingLabelText="Discount value" name="discount_value" component={this.renderTextField} />
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
        </PromotionMaintenanceTemplate>
      </form>
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
