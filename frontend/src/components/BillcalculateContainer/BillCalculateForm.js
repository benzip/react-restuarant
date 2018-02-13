import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import PropTypes from "prop-types";
import Paper from "material-ui/Paper";
import Chip from "material-ui/Chip";
import DoneIcon from "material-ui-icons/Done";
import Avatar from "material-ui/Avatar";
import { Divider } from "material-ui";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit
  }
});

class BillCalculateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepIndex: this.props.currentStep || 0
    };
  }

  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2
    });
  };

  render() {
    const { stepIndex } = this.state;
    const { stepDataSource } = this.props;

    return (
      <div>
        <form>
          <div className="col-lg-12">
            <TextField type="number" floatingLabelText="Number of customer" />
          </div>
          <div className="col-lg-12">
            <TextField type="number" value={459.0} floatingLabelText="Unit price" />
          </div>
          <div className="col-lg-12">
            <TextField type="text" floatingLabelText="Promotion code" />
          </div>
          <div className="col-lg-12">
            <Paper style={{ padding: "18px" }}>
              <Chip label="Clickable Deletable Chip" className={styles.chip}>
                <s>Promo code LUCKY TWO</s>
              </Chip>
              <Divider style={{ marginTop: "8px", marginBottom: "8px" }} />
              <Chip label="Clickable Deletable Chip" className={styles.chip}>
                Discount 25% for bill is over 6000 bath
              </Chip>
              <Divider style={{ marginTop: "8px", marginBottom: "8px" }} />
              <Chip label="Clickable Deletable Chip" className={styles.chip}>
                Discount 25% for bill is over 6000 bath
              </Chip>
            </Paper>
          </div>
          <div className="col-lg-12" style={{ marginTop: "12px" }}>
            <RaisedButton label="Calculate" primary={true} onClick={this.handleNext.bind(this)} />
          </div>
        </form>
      </div>
    );
  }
}
const comp = reduxForm({ form: "billCalculateForm", enableReinitialize: true })(BillCalculateForm);
export default comp;
