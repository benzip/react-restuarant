import React, { Component } from "react";
import { connect } from "react-redux";
import * as PromotionActionCreators from "../actionCreators/promotionActionCreator";
import PromotionHeaderListView from "../components/PromotionMaintenanceContainer/PromotionHeaderListView";
import PromotionHeaderEditForm from "../components/PromotionMaintenanceContainer/PromotionHeaderEditForm";
import PromotionDetailListView from "../components/PromotionMaintenanceContainer/PromotionDetailListView";
import PromotionEditDetailForm from "../components/PromotionMaintenanceContainer/PromotionEditDetailForm";
import SwipeableViews from "react-swipeable-views";
import RaisedButton from "material-ui/RaisedButton/RaisedButton";
import FlatButton from "material-ui/FlatButton/FlatButton";
import Divider from "material-ui/Divider/Divider";

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
      currentViewIndex: VIEWS.headerListViewSwipeIndex
    };
  }
  componentDidMount() {
    this.props.getPromotionHeaders();
    this.onBack = this.onBack.bind(this);
  }

  onEditHeader = promotion => {
    this.props.getPromotionHeader(promotion.id);
    this.setState({
      currentViewIndex: VIEWS.headerEditViewSwipeIndex
    });
  };

  onAddHeader = () => {
    this.setState({
      currentViewIndex: VIEWS.headerEditViewSwipeIndex
    });
  };

  onAddDetail = () => {
    this.setState({
      currentViewIndex: VIEWS.detailEditViewSwipeIndex
    });
  };

  onDeleteHeader = promotionHeader => {
    this.props.deletePromotionHeader(promotionHeader.id);
  };

  onListingDetail = promotion => {
    this.props.getPromotionDetails(promotion.id);
    this.setState({
      currentViewIndex: VIEWS.detailListViewSwipeIndex,
      headerId: promotion.id
    });
  };

  onEditDetail = promotionDetail => {
    this.props.getPromotionDetail(promotionDetail.id);
    this.setState({
      currentViewIndex: VIEWS.detailEditViewSwipeIndex
    });
  };

  onDeleteDetail = promotionDetail => {
    this.props.deletePromotionDetail(promotionDetail.id);
  };

  onSaveHeader = promotionHeader => {
    this.props.savePromotionHeader(promotionHeader.id, promotionHeader);
    this.setState({
      currentViewIndex: VIEWS.headerListViewSwipeIndex
    });
  };

  onSaveDetail = promotionDetail => {
    this.props.savePromotionDetail(promotionDetail.id, promotionDetail);
    this.setState({
      currentViewIndex: VIEWS.detailListViewSwipeIndex
    });
  };

  onBack = stepIndex => {
    this.setState({
      currentViewIndex: stepIndex
    });
  };

  renderHeaderListView = () => {
    const { promotions } = this.props.promotionReducer;
    return (
      <PromotionHeaderListView
        promotionDataSource={promotions}
        onAdd={this.onAddHeader.bind(this)}
        onEdit={this.onEditHeader.bind(this)}
        onListingDetail={this.onListingDetail.bind(this)}
        onDelete={this.onDeleteHeader.bind(this)}
      />
    );
  };

  renderHeaderEditForm = () => {
    return <PromotionHeaderEditForm onBack={() => this.onBack(VIEWS.headerListViewSwipeIndex)} onSave={this.onSaveHeader.bind(this)} />;
  };

  renderDetailListView = () => {
    const { selectedPromotionDetails } = this.props.promotionReducer;
    return (
      <PromotionDetailListView
        promotionDetailDataSource={selectedPromotionDetails}
        onSave={this.onSaveDetail.bind(this)}
        onEdit={this.onEditDetail.bind(this)}
        onDelete={this.onDeleteDetail.bind(this)}
        onAdd={this.onAddDetail.bind(this)}
        onBack={() => this.onBack(VIEWS.headerListViewSwipeIndex)}
      />
    );
  };

  renderDetailEditForm = () => {
    const { selectedPromotionDetail } = this.props.promotionReducer;
    return (
      <div>
        <header className="panel_header">
          <p className="title pull-left">Edit detail</p>
        </header>
        <PromotionEditDetailForm headerId={this.state.headerId} onBack={() => this.onBack(VIEWS.detailListViewSwipeIndex)} onSave={this.onSaveDetail.bind(this)} />
      </div>
    );
  };

  render() {
    return (
      <div>
        <header className="panel_header">
          <h2 className="title pull-left">Promotion maintenance</h2>
        </header>
        <Divider />
        <SwipeableViews index={this.state.currentViewIndex} style={{ marginTop: "30px" }}>
          <div>{this.state.currentViewIndex === VIEWS.headerListViewSwipeIndex ? this.renderHeaderListView() : <div />}</div>
          <div>{this.state.currentViewIndex === VIEWS.headerEditViewSwipeIndex ? this.renderHeaderEditForm() : <div />} </div>
          <div>{this.state.currentViewIndex === VIEWS.detailListViewSwipeIndex ? this.renderDetailListView() : <div />} </div>
          <div>{this.state.currentViewIndex === VIEWS.detailEditViewSwipeIndex ? this.renderDetailEditForm() : <div />} </div>
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
  getPromotionHeaders: PromotionActionCreators.viewActions.getPromotionHeaders,
  getPromotionHeader: PromotionActionCreators.viewActions.getPromotionHeader,
  getPromotionDetails: PromotionActionCreators.viewActions.getPromotionDetails,
  getPromotionDetail: PromotionActionCreators.viewActions.getPromotionDetail,
  savePromotionHeader: PromotionActionCreators.viewActions.savePromotionHeader,
  deletePromotionHeader: PromotionActionCreators.viewActions.deletePromotionHeader,
  savePromotionDetail: PromotionActionCreators.viewActions.savePromotionDetail,
  deletePromotionDetail: PromotionActionCreators.viewActions.deletePromotionDetail
})(PromotionMaintenanceContainer);
