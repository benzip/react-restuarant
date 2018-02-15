import React, { Component } from "react";
import PromotionChipItem from "./PromotionChipItem";
import Paper from "material-ui/Paper";
class PromotionChips extends Component {
  render() {
    const { appliedPromotions } = this.props;
    return (
      <Paper className="chip-wrapper">
        {appliedPromotions.map((item, index) => {
          <PromotionChipItem label={item.description} used={false} />;
        })}
      </Paper>
    );
  }
}

export default PromotionChips;
