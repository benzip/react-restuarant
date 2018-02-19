import React from "react";
import { List, ListItem } from "material-ui/List";
import utils from "../commons/utils";

class ListView extends React.Component {
  renderRightIconButton = row => {
    const { rightIconMenu } = this.props;
    return rightIconMenu(row);
  };

  render() {
    const { dataSource, primatryTextPropertyName, secondaryTextPropertiesName } = this.props;
    return (
      <div className="list-view-container">
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
