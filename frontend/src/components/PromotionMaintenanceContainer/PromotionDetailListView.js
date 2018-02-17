import React from "react";
import { List, ListItem } from "material-ui/List";
import PropTypes from "prop-types";
import MenuItem from "material-ui/MenuItem";
import IconMenu from "material-ui/IconMenu";
import IconButton from "material-ui/IconButton";
import Divider from "material-ui/Divider";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import { grey400 } from "material-ui/styles/colors";

const iconButtonElement = (
  <IconButton touch={true} tooltip="more" tooltipPosition="bottom-left">
    <MoreVertIcon color={grey400} />
  </IconButton>
);

class PromotionDetailListView extends React.Component {
  renderRightIconMenu = promotion => {
    const { onEdit, onDelete, onEditDetail } = this.props;
    return (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem onClick={() => onEdit(promotion)}>Edit</MenuItem>
        <Divider />
        <MenuItem onClick={() => onDelete(promotion)}>Delete</MenuItem>
      </IconMenu>
    );
  };

  render() {
    const { promotionDetailDataSource } = this.props;
    return (
      <List>
        {promotionDetailDataSource.map((promotion, index) => (
          <ListItem key={index} className="list-item" primaryText={`${promotion.description}`} secondaryText={"Test"} hoverColor="#eee" rightIconButton={this.renderRightIconMenu(promotion)} />
        ))}
      </List>
    );
  }
}

PromotionDetailListView.propTypes = {
  promotionDetailDataSource: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      header_id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      bill_value_from: PropTypes.number,
      bill_value_to: PropTypes.number,
      promo_code: PropTypes.string,
      number_of_seat: PropTypes.number
    })
  )
};
export default PromotionDetailListView;
