import React from "react";
import PropTypes from "prop-types";
import MenuItem from "material-ui/MenuItem";
import { Toolbar, ToolbarGroup } from "material-ui/Toolbar";
import { Link } from "react-router-dom";
class TopNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 3
    };
  }

  render() {
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          {this.props.menuDataSource.map((menu, index) => {
            return <MenuItem key={index} value={index} primaryText={menu.description} containerElement={<Link to={menu.route}> </Link>} />;
          })}
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

TopNav.propTypes = {
  menuDataSource: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      route: PropTypes.string.isRequired
    })
  ).isRequired
};

export default TopNav;
