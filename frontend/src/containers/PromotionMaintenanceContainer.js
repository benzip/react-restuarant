import React, { Component } from "react";
import { connect } from "react-redux";
import * as PromotionActionCreators from "../actionCreators/promotionActionCreator";
import PromotionListView from "../components/PromotionListView";
import PromotionEditForm from "../components/PromotionMaintenanceContainer/PromotionEditForm";
import PromotionDetailListView from "../components/PromotionMaintenanceContainer/PromotionDetailListView";
import PromotionEditDetailForm from "../components/PromotionMaintenanceContainer/PromotionEditDetailForm";
import SwipeableViews from "react-swipeable-views";
import RaisedButton from "material-ui/RaisedButton/RaisedButton";

const VIEWS = {
  headerListViewSwipeIndex: 0,
  editHeaderViewSwipeIndex: 1,
  detailListViewSwipeIndex: 2,
  editDetailViewSwipeIndex: 3
};
class PromotionMaintenanceContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promotions: null,
      editMode: false,
      currentViewIndex: VIEWS.headerListViewSwipeIndex,
      selectedPromotion: {}
    };
  }

  componentDidMount() {
    this.props.getPromotions();
    this.onBack = this.onBack.bind(this);
  }
  onDelete = () => {};

  onEdit = promotion => {
    this.props.getPromotionHeader(promotion.id);
    this.setState({
      currentViewIndex: VIEWS.editHeaderViewSwipeIndex
    });
  };

  onEditDetail = promotion => {
    this.props.getPromotionDetails(promotion.id);
    this.setState({
      currentViewIndex: VIEWS.detailListViewSwipeIndex
    });
  };

  onDeleteDetail = promotion => {};

  onSave = promotion => {
    console.log(promotion, "promotion");
  };
  onBack = stepIndex => {
    this.setState({
      currentViewIndex: stepIndex
    });
  };

  renderListView = () => {
    const { promotions } = this.props.promotionReducer;
    return (
      <div>
        <div className="list-view-container">
          <PromotionListView promotionDataSource={promotions} onEdit={this.onEdit.bind(this)} onEditDetail={this.onEditDetail.bind(this)} onDelete={this.onDeleteDetail.bind(this)} />
        </div>
      </div>
    );
  };

  renderEditView = () => {
    const { selectedPromotion, selectedPromotionDetails } = this.props.promotionReducer;
    return <PromotionEditForm promotion={selectedPromotion} details={selectedPromotionDetails} onBack={() => this.onBack(VIEWS.headerListViewSwipeIndex)} onSave={this.onSave.bind(this)} />;
  };

  renderDetailListView = () => {
    const { selectedPromotion, selectedPromotionDetails } = this.props.promotionReducer;
    return (
      <div>
        <RaisedButton label="Back" onClick={() => this.onBack(VIEWS.headerListViewSwipeIndex)} />
        <PromotionDetailListView promotionDetailDataSource={selectedPromotionDetails} onSave={this.onSave.bind(this)} />
      </div>
    );
  };

  renderEditDetailView = () => {
    const { promotionDetail } = this.props.promotionReducer;
    return <PromotionEditForm promotionDetail={promotionDetail} onBack={() => this.onBack(VIEWS.detailListViewSwipeIndex)} onSave={this.onSave.bind(this)} />;
  };

  render() {
    return (
      <div>
        <header className="panel_header">
          <h2 className="title pull-left">Promosion maintenance</h2>
        </header>
        <SwipeableViews index={this.state.currentViewIndex}>
          <div>{this.state.currentViewIndex === VIEWS.headerListViewSwipeIndex ? this.renderListView() : <div />}</div>
          <div>{this.state.currentViewIndex === VIEWS.editHeaderViewSwipeIndex ? this.renderEditView() : <div />} </div>
          <div>{this.state.currentViewIndex === VIEWS.detailListViewSwipeIndex ? this.renderDetailListView() : <div />} </div>
          <div>{this.state.currentViewIndex === VIEWS.editDetailViewSwipeIndex ? this.renderEditDetailView() : <div />} </div>
        </SwipeableViews>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    promotionReducer: state.promotionReducer
  };
}

export default connect(mapStateToProps, {
  getPromotions: PromotionActionCreators.viewActions.getPromotions,
  getPromotionHeader: PromotionActionCreators.viewActions.getPromotionHeader,
  getPromotionDetails: PromotionActionCreators.viewActions.getPromotionDetails
})(PromotionMaintenanceContainer);
