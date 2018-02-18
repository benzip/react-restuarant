import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";

export default class Confirmdialog extends React.Component {
  state = {
    open: true
  };

  handleOpen = () => {
    this.setState({ open: true });
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
    const { message } = this.props;
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
      <FlatButton label="OK" primary={true} keyboardFocused={true} onClick={this.handleOK.bind(this)} />
    ];

    return (
      <div>
        <Dialog title="Confirmation" actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleClose}>
          {message}
        </Dialog>
      </div>
    );
  }
}
