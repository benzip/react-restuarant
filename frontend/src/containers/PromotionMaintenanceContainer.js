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
  headerEditViewSwipeIndex: 1,
  detailListViewSwipeIndex: 2,
  detailEditViewSwipeIndex: 3
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
      currentViewIndex: VIEWS.headerEditViewSwipeIndex
    });
  };

  onListingDetail = promotion => {
    this.props.getPromotionDetails(promotion.id);
    this.setState({
      currentViewIndex: VIEWS.detailListViewSwipeIndex
    });
  };

  onEditDetail = promotionDetail => {
    this.props.getPromotionDetail(promotionDetail.id);
    this.setState({
      currentViewIndex: VIEWS.detailEditViewSwipeIndex
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

  renderHeaderListView = () => {
    const { promotions } = this.props.promotionReducer;
    return (
      <div>
        <header className="panel_header">
          <p className="title pull-left">Header list view</p>
        </header>
        <div className="list-view-container">
          <PromotionListView promotionDataSource={promotions} onEdit={this.onEdit.bind(this)} onListingDetail={this.onListingDetail.bind(this)} onDelete={this.onDeleteDetail.bind(this)} />
        </div>
      </div>
    );
  };

  renderHeaderEditView = () => {
    const { selectedPromotion, selectedPromotionDetails } = this.props.promotionReducer;
    return (
      <div>
        <header className="panel_header">
          <p className="title pull-left">Edit promotion header</p>
        </header>
        <PromotionEditForm promotion={selectedPromotion} details={selectedPromotionDetails} onBack={() => this.onBack(VIEWS.headerListViewSwipeIndex)} onSave={this.onSave.bind(this)} />
      </div>
    );
  };

  renderDetailListView = () => {
    const { selectedPromotionDetails } = this.props.promotionReducer;
    return (
      <div>
        <header className="panel_header">
          <RaisedButton label="Back" onClick={() => this.onBack(VIEWS.headerListViewSwipeIndex)} />
          <p className="title pull-left">Detail list view</p>
        </header>
        <PromotionDetailListView promotionDetailDataSource={selectedPromotionDetails} onSave={this.onSave.bind(this)} onEdit={this.onEditDetail.bind(this)} />
      </div>
    );
  };

  renderDetailEditView = () => {
    const { selectedPromotionDetail } = this.props.promotionReducer;
    return (
      <div>
        <header className="panel_header">
          <p className="title pull-left">Edit detail</p>
        </header>
        <PromotionEditDetailForm onBack={() => this.onBack(VIEWS.detailListViewSwipeIndex)} onSave={this.onSave.bind(this)} />
      </div>
    );
  };

  render() {
    return (
      <div>
        <header className="panel_header">
          <h2 className="title pull-left">Promotion maintenance</h2>
        </header>
        <SwipeableViews index={this.state.currentViewIndex}>
          <div>{this.state.currentViewIndex === VIEWS.headerListViewSwipeIndex ? this.renderHeaderListView() : <div />}</div>
          <div>{this.state.currentViewIndex === VIEWS.headerEditViewSwipeIndex ? this.renderHeaderEditView() : <div />} </div>
          <div>{this.state.currentViewIndex === VIEWS.detailListViewSwipeIndex ? this.renderDetailListView() : <div />} </div>
          <div>{this.state.currentViewIndex === VIEWS.detailEditViewSwipeIndex ? this.renderDetailEditView() : <div />} </div>
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
  getPromotionDetails: PromotionActionCreators.viewActions.getPromotionDetails,
  getPromotionDetail: PromotionActionCreators.viewActions.getPromotionDetail
})(PromotionMaintenanceContainer);
