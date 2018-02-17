import * as ActionTypes from "../actiontypes/promotionActionTypes";
import _ from "lodash";
import axios from "axios";
const initialState = { promotions: [], findResults: [], appliedPromotions: [], selectedPromotion: {}, selectedPromotionDetail: {}, selectedPromotionDetails: [] };

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_PROMOTIONS_REQUEST_TYPE.SUCCESS:
      return {
        ...state,
        promotions: action.payload.data
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
        selectedPromotion: action.payload.data
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
    default:
      return state;
      break;
  }
}
