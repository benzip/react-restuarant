import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

export default class Confirmdialog extends React.Component {
  state = {
    open: true
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOK = () => {
    const { onOK } = this.props;
    onOK();
    this.setState({ open: false });
  };

  render() {
    const { message, open, handleClose } = this.props;
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={handleClose} />,
      <FlatButton label="OK" primary={true} keyboardFocused={true} onClick={this.handleOK.bind(this)} />
    ];

    return (
      <div>
        <Dialog title="Confirmation" actions={actions} modal={false} open={open} onRequestClose={handleClose}>
          {message}
        </Dialog>
      </div>
    );
  }
}
