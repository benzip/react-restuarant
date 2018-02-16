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
      var { appliedPromotions } = state;
      var { data } = action.payload;
      if (data.length > 0) {
        appliedPromotions = appliedPromotions.concat(data);
      }
      return {
        ...state,
        findResults: action.payload.data,
        appliedPromotions: appliedPromotions
      };
    default:
      return state;
      break;
  }
}
