import React from "react";
import { List, ListItem } from "material-ui/List";
import PropTypes from "prop-types";
import MenuItem from "material-ui/MenuItem";
import IconMenu from "material-ui/IconMenu";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import { grey400 } from "material-ui/styles/colors";

const iconButtonElement = (
  <IconButton touch={true} tooltip="more" tooltipPosition="bottom-left">
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Edit</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);

class PromotionListView extends React.Component {
  edit = promotion => {
    console.log("edit", promotion);
  };

  delete = promotion => {
    console.log("delete", promotion);
  };

  render() {
    const { promotionDataSource } = this.props;
    return (
      <List>
        {promotionDataSource.map((promotion, index) => (
          <ListItem
            key={index}
            className="list-item"
            primaryText={`${promotion.description}`}
            hoverColor="#eee"
            rightIconButton={rightIconMenu}
          />
        ))}
      </List>
    );
  }
}

PromotionListView.propTypes = {
  promotionDataSource: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired
    })
  )
};
export default PromotionListView;
