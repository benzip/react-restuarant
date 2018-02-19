import React, { Component } from "react";
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

  handleCloseDialog = () => {
    this.setState({ openDialog: false });
  };

  render() {
    const { onSave, onBack, headerText, confirmMessage } = this.props;
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
        {this.state.openDialog ? (
          <Confirmdialog open={this.state.openDialog} onOK={onSave} message={confirmMessage} handleClose={this.handleCloseDialog.bind(this)} />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default PromotionHeaderEditForm;
