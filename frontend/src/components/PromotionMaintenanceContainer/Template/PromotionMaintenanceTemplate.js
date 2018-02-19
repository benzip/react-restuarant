import React from "react";
import { Toolbar, ToolbarGroup, ToolbarTitle } from "material-ui/Toolbar";
import FloatingActionButton from "material-ui/FloatingActionButton";
import NavigationArrowBack from "material-ui/svg-icons/navigation/arrow-back";
class PromotionMaintenanceTemplate extends React.Component {
  renderToolBar() {
    const { toolbarComponent, headerText, onBack } = this.props;

    return (
      <Toolbar>
        <ToolbarGroup>
          {onBack && (
            <FloatingActionButton mini={true} backgroundColor="#eee" iconStyle={{ fill: "black" }} onClick={onBack} tooltip="back">
              <NavigationArrowBack />
            </FloatingActionButton>
          )}
          <ToolbarTitle text={headerText} style={{ marginLeft: "10px" }} />
        </ToolbarGroup>
        <ToolbarGroup>{toolbarComponent}</ToolbarGroup>
      </Toolbar>
    );
  }

  render() {
    const { containerClassName } = this.props;
    return (
      <div className={containerClassName}>
        {this.renderToolBar()}
        {this.props.children}
      </div>
    );
  }
}

export default PromotionMaintenanceTemplate;
