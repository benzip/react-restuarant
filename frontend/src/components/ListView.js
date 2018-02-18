import React from "react";
import { List, ListItem } from "material-ui/List";
import PropTypes from "prop-types";
import MenuItem from "material-ui/MenuItem";
import IconMenu from "material-ui/IconMenu";
import IconButton from "material-ui/IconButton";
import Divider from "material-ui/Divider";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import { grey400 } from "material-ui/styles/colors";
import utils from "../commons/utils";
import RaisedButton from "material-ui/RaisedButton";
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from "material-ui/Toolbar";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";

class ListView extends React.Component {
  renderToolBar() {
    const { onAdd, headerText } = this.props;
    return (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text={headerText} />
        </ToolbarGroup>
        <ToolbarGroup>
          <FloatingActionButton onClick={onAdd} mini={true}>
            <ContentAdd />
          </FloatingActionButton>
        </ToolbarGroup>
      </Toolbar>
    );
  }

  renderRightIconButton = row => {
    const { rightIconMenu } = this.props;
    return rightIconMenu(row);
  };

  render() {
    const { dataSource, primatryTextPropertyName, secondaryTextPropertiesName } = this.props;
    return (
      <div className="list-view-container">
        {this.renderToolBar()}
        <List>
          {dataSource.map((row, index) => (
            <ListItem
              key={index}
              className="list-item"
              primaryText={row[primatryTextPropertyName]}
              secondaryText={utils.describeByProps(row, secondaryTextPropertiesName)}
              hoverColor="#eee"
              rightIconButton={this.renderRightIconButton(row)}
            />
          ))}
        </List>
      </div>
    );
  }
}

export default ListView;
