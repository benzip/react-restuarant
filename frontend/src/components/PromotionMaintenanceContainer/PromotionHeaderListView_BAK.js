import React from "react";
import { List, ListItem } from "material-ui/List";
import PropTypes from "prop-types";
import MenuItem from "material-ui/MenuItem";
import IconMenu from "material-ui/IconMenu";
import IconButton from "material-ui/IconButton";
import Divider from "material-ui/Divider";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import { grey400 } from "material-ui/styles/colors";
import utils from "../../commons/utils";
import RaisedButton from "material-ui/RaisedButton";
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from "material-ui/Toolbar";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";

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

  renderToolBar() {
    return (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text="Promotion header list" />
        </ToolbarGroup>
        <ToolbarGroup>
          <FloatingActionButton onClick={this.props.onAdd} mini={true}>
            <ContentAdd />
          </FloatingActionButton>
        </ToolbarGroup>
      </Toolbar>
    );
  }

  render() {
    const { promotionDataSource } = this.props;
    return (
      <div className="list-view-container">
        {this.renderToolBar()}
        <List>
          {promotionDataSource.map((promotion, index) => (
            <ListItem
              key={index}
              className="list-item"
              primaryText={`${promotion.description}`}
              secondaryText={utils.describeByProps(promotion, ["discount_value", "discount_type", "promotion_group"])}
              hoverColor="#eee"
              rightIconButton={this.renderRightIconMenu(promotion)}
            />
          ))}
        </List>
      </div>
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
