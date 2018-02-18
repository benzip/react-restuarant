import React from "react";
import { List, ListItem } from "material-ui/List";
import PropTypes from "prop-types";
import MenuItem from "material-ui/MenuItem";
import IconMenu from "material-ui/IconMenu";
import IconButton from "material-ui/IconButton";
import Divider from "material-ui/Divider";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import { grey400 } from "material-ui/styles/colors";
import ListView from "../ListView";
import PromotionMaintenanceTemplate from "./PromotionMaintenanceTemplate";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";

const iconButtonElement = (
  <IconButton touch={true} tooltip="more" tooltipPosition="bottom-left">
    <MoreVertIcon color={grey400} />
  </IconButton>
);

class PromotionDetailListView extends React.Component {
  renderRightIconMenu = promotionDetail => {
    const { onEdit, onDelete } = this.props;
    return (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem onClick={() => onEdit(promotionDetail)}>Edit</MenuItem>
        <Divider />
        <MenuItem onClick={() => onDelete(promotionDetail)}>Delete</MenuItem>
      </IconMenu>
    );
  };
  render() {
    const { promotionDetailDataSource, onAdd, onBack } = this.props;
    return (
      <PromotionMaintenanceTemplate
        containerClassName="list-view-container"
        headerText="Promotion detail list"
        onBack={onBack}
        toolbarComponent={
          <FloatingActionButton onClick={onAdd} mini={true}>
            <ContentAdd />
          </FloatingActionButton>
        }
      >
        <ListView
          dataSource={promotionDetailDataSource}
          onAdd={onAdd}
          primatryTextPropertyName="description"
          secondaryTextPropertiesName={["bill_value_from", "bill_value_to", "promo_code", "number_of_seat"]}
          rightIconMenu={this.renderRightIconMenu.bind(this)}
        />
      </PromotionMaintenanceTemplate>
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
