import * as ActionTypes from "../actiontypes/promotionActionTypes";
import _ from "lodash";
import axios from "axios";
const initialState = { promotions: [], findResults: [], appliedPromotions: [] };

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_PROMOTIONS_REQUEST_TYPE.SUCCESS:
      return {
        ...state,
        promotions: action.payload.data
      };
    case ActionTypes.FIND_PROMOTIONS_REQUEST_TYPE.SUCCESS:
      var { findResults } = state;
      var { data } = action.payload;
      if (data.length > 0) {
        findResults = findResults.concat(data);
      }
      return {
        ...state,
        findResults: findResults
      };
    case ActionTypes.APPLY_PROMOTIONS_REQUEST_TYPE.SUCCESS:
      var { data } = action.payload;
      return {
        ...state,
        appliedPromotions: data
      };
    case ActionTypes.FIND_AND_APPLY_PROMOTIONS_REQUEST_TYPE.SUCCESS:
      var { data } = action.payload;
      return {
        ...state,
        appliedPromotions: data
      };
    default:
      return state;
      break;
  }
}
