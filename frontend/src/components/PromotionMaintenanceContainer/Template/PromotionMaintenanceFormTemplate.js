import React, { Component } from "react";
import { Field, reduxForm, getFormValues } from "redux-form";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import PromotionMaintenanceTemplate from "./PromotionMaintenanceTemplate";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentSave from "material-ui/svg-icons/content/save";
import Confirmdialog from "../../Confirmdialog";

class PromotionHeaderEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false
    };
  }

  handleSubmit = e => {
    const { onSave, valid } = this.props;
    e.preventDefault();
    if (!valid) {
      onSave(e); // call default redux form,for show error message
    }
    this.setState({ openDialog: valid });
  };

  render() {
    const { onSave, onBack, headerText, valid, confirmMessage } = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <PromotionMaintenanceTemplate
            containerClassName="form-container"
            headerText={headerText}
            onBack={onBack}
            toolbarComponent={
              <FloatingActionButton type="submit" mini={true}>
                <ContentSave />
              </FloatingActionButton>
            }
          >
            {this.props.children}
          </PromotionMaintenanceTemplate>
        </form>
        {this.state.openDialog ? <Confirmdialog onOK={onSave} message={confirmMessage} /> : ""}
      </div>
    );
  }
}

export default PromotionHeaderEditForm;
