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
          return <PromotionChipItem key={index} label={item.description} used={item.used} />;
        })}
      </Paper>
    );
  }
}

export default PromotionChips;
