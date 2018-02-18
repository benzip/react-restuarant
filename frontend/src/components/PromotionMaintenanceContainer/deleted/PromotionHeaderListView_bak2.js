import React from "react";
import { List, ListItem } from "material-ui/List";
import PropTypes from "prop-types";
import MenuItem from "material-ui/MenuItem";
import IconMenu from "material-ui/IconMenu";
import Divider from "material-ui/Divider";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import { grey400 } from "material-ui/styles/colors";
import IconButton from "material-ui/IconButton";
import ListView from "../ListView";

const iconButtonElement = (
  <IconButton touch={true} tooltip="more" tooltipPosition="bottom-left">
    <MoreVertIcon color={grey400} />
  </IconButton>
);

class PromotionHeaderListView extends React.Component {
  renderRightIconMenu = promotion => {
    const { onEdit, onDelete, onListingDetail } = this.props;
    return (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem onClick={() => onEdit(promotion)}>Edit</MenuItem>
        <MenuItem onClick={() => onListingDetail(promotion)}>Set condition</MenuItem>
        <Divider />
        <MenuItem onClick={() => onDelete(promotion)}>Delete</MenuItem>
      </IconMenu>
    );
  };
  render() {
    const { promotionDataSource, onAdd } = this.props;
    return (
      <ListView
        headerText="Promotion header list"
        dataSource={promotionDataSource}
        onAdd={onAdd}
        primatryTextPropertyName="description"
        secondaryTextPropertiesName={["discount_value", "discount_type", "promotion_group"]}
        rightIconMenu={this.renderRightIconMenu.bind(this)}
      />
    );
  }
}

PromotionHeaderListView.propTypes = {
  promotionDataSource: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired
    })
  )
};
export default PromotionHeaderListView;
