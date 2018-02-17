import * as ActionTypes from "../actiontypes/promotionActionTypes";
import _ from "lodash";
import axios from "axios";
const initialState = { promotions: [], findResults: [], appliedPromotions: [], selectedPromotionHeader: {}, selectedPromotionDetail: {}, selectedPromotionDetails: [] };

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_PROMOTION_HEADERS_REQUEST_TYPE.SUCCESS:
      return {
        ...state,
        promotions: action.payload.data,
        selectedPromotionHeader: {},
        selectedPromotionDetail: {},
        selectedPromotionDetails: []
      };
    // case ActionTypes.FIND_PROMOTIONS_REQUEST_TYPE.SUCCESS:
    //   var { findResults } = state;
    //   var { data } = action.payload;
    //   if (data.length > 0) {
    //     findResults = findResults.concat(data);
    //   }
    //   return {
    //     ...state,
    //     findResults: findResults
    //   };
    // case ActionTypes.APPLY_PROMOTIONS_REQUEST_TYPE.SUCCESS:
    //   var { data } = action.payload;
    //   return {
    //     ...state,
    //     appliedPromotions: data
    //   };
    case ActionTypes.FIND_AND_APPLY_PROMOTIONS_REQUEST_TYPE.SUCCESS:
      var { data } = action.payload;
      return {
        ...state,
        appliedPromotions: data.appliedPromotions,
        calculateResult: data.calculateResult
      };
    case ActionTypes.GET_PROMOTION_HEADER_REQUEST_TYPE.SUCCESS:
      return {
        ...state,
        selectedPromotionHeader: action.payload.data
      };
    case ActionTypes.GET_PROMOTION_DETAILS_REQUEST_TYPE.SUCCESS:
      return {
        ...state,
        selectedPromotionDetails: action.payload.data
      };
    case ActionTypes.GET_PROMOTION_DETAIL_REQUEST_TYPE.SUCCESS:
      return {
        ...state,
        selectedPromotionDetail: action.payload.data
      };
    case ActionTypes.SAVE_PROMOTION_HEADER_REQUEST_TYPE.SUCCESS:
      return {
        ...state,
        selectedPromotionHeader: {},
        promotions: action.payload.data
      };
    case ActionTypes.DELETE_PROMOTION_HEADER_REQUEST_TYPE.SUCCESS:
      const { promotions } = state;
      let newPromotions;
      newPromotions = _.remove(promotions, promotion => {
        return promotion.id != action.payload.data.id;
      });
      return {
        ...state,
        selectedPromotionHeader: {},
        promotions: newPromotions
      };
    case ActionTypes.SAVE_PROMOTION_DETAIL_REQUEST_TYPE.SUCCESS:
      return {
        ...state,
        selectedPromotionDetail: {}
      };
    case ActionTypes.DELETE_PROMOTION_DETAIL_REQUEST_TYPE.SUCCESS:
      return {
        ...state,
        selectedPromotionDetail: {}
      };
    default:
      return state;
      break;
  }
}
