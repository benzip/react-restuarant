import * as ActionTypes from "../actiontypes/promotionActionTypes";
import _ from "lodash";
import axios from "axios";
const initialState = { promotions: [], findResults: [] };

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_PROMOTIONS:
      return {
        ...state,
        promotions: action.payload.data
      };
    case ActionTypes.FIND_PROMOTIONS:
      debugger;
      return {
        ...state,
        findResults: action.payload.data
      };
    default:
      return state;
      break;
  }
}
