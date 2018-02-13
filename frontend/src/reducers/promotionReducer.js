import * as ActionTypes from "../actiontypes/promotionActionTypes";
import _ from "lodash";
import axios from "axios";
const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_PROMOTIONS:
      return {
        ...state,
        promotions: action.payload.data
      };
    default:
      return state;
      break;
  }
}
