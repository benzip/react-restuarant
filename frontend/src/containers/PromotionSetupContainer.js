import React, { Component } from "react";
import { connect } from "react-redux";
import * as PromotionActionCreators from "../actionCreators/promotionActionCreator";
import PromotionListView from "../components/PromotionListView";
class PromotionSetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promotions: null,
      stepIndex: 0
    };
  }

  componentDidMount() {
    this.props.getPromotions();
  }
  handleNext() {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2
    });
  }

  render() {
    const { promotions } = this.props.promotionReducer;

    if (promotions) {
      return (
        <div>
          <header className="panel_header">
            <h2 className="title pull-left">Promosion setup</h2>
          </header>
          <div className="list-view-container">
            <PromotionListView promotionDataSource={promotions} />
          </div>
        </div>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

function mapStateToProps(state) {
  return {
    promotionReducer: state.promotionReducer
  };
}

export default connect(mapStateToProps, {
  getPromotions: PromotionActionCreators.getPromotions
})(PromotionSetup);
