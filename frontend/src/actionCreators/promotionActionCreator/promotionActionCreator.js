import * as ActionTypes from "../../actiontypes/promotionActionTypes";
import _ from "lodash";
import axios from "axios";
import { API_ENTRY_POINT } from "../../commons/consts/api_resources/api_endpoints";

export function getPromotions() {
  var request = axios({
    method: "get",
    url: `http://localhost:3000/api/promotions`
  });

  return {
    type: ActionTypes.GET_PROMOTIONS,
    payload: request
  };
}

export function findPromotions(params) {
  console.log("params", params);
  var request = axios.post("http://localhost:3000/api/promotions/find", {
    billValue: params.billValue,
    promotionCode: params.promotionCode,
    numberOfSeat: params.numberOfSeat
  });

  return {
    type: ActionTypes.FIND_PROMOTIONS,
    payload: request
  };
}
