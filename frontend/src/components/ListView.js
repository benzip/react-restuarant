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

class ListView extends React.Component {
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
    const { onAdd } = this.props;
    return (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text="Promotion header list" />
        </ToolbarGroup>
        <ToolbarGroup>
          <FloatingActionButton onClick={onAdd} mini={true}>
            <ContentAdd />
          </FloatingActionButton>
        </ToolbarGroup>
      </Toolbar>
    );
  }

  render() {
    const { dataSource, rightIconMenu, primatryTextPropertyName, secondaryTextPropertiesName } = this.props;
    return (
      <div className="list-view-container">
        {this.renderToolBar()}
        <List>
          {dataSource.map((row, index) => (
            <ListItem
              key={index}
              className="list-item"
              primaryText={item[primatryTextPropertyName]}
              secondaryText={utils.describeByProps(item, secondaryTextPropertiesName)}
              hoverColor="#eee"
              rightIconButton={rightIconMenu}
            />
          ))}
        </List>
      </div>
    );
  }
}

export default ListView;
