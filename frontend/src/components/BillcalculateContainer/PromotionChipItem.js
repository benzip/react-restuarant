import React from "react";
import Chip from "material-ui/Chip";
import PropTypes from "prop-types";

function handleRequestDelete() {
  alert("You clicked the delete button.");
}

class PromotionChipItem extends React.Component {
  render() {
    const { label, used } = this.props;
    const usedClassName = used ? "" : "strike-through";
    return (
      <Chip onRequestDelete={handleRequestDelete} className={`chip-item ${usedClassName}`}>
        {label}
      </Chip>
    );
  }
}

PromotionChipItem.propTypes = {
  label: PropTypes.string.isRequired,
  used: PropTypes.bool
};

export default PromotionChipItem;
