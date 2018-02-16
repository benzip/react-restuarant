import React, { Component } from "react";
import PromotionChipItem from "./PromotionChipItem";
import Paper from "material-ui/Paper";
class PromotionChips extends Component {
  render() {
    const { appliedPromotions } = this.props;

    console.log("chip item appliedPromotions", appliedPromotions);
    return (
      <Paper className="chip-wrapper">
        {appliedPromotions.map((item, index) => {
          return <PromotionChipItem label={item.description} used={false} />;
        })}
      </Paper>
    );
  }
}

export default PromotionChips;
