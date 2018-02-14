import React, { Component } from "react";
import PromotionChipItem from "./PromotionChipItem";
import Paper from "material-ui/Paper";
class PromotionChips extends Component {
  render() {
    return (
      <Paper className="chip-wrapper">
        <PromotionChipItem label="Promo code LUCKY TWO" used={false} />
        <PromotionChipItem label="Discount 25% for bill is over 6000 bath" used />
        <PromotionChipItem label="Discount 25% f" used />
      </Paper>
    );
  }
}

export default PromotionChips;
