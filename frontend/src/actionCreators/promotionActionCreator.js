import * as ActionTypes from "../actiontypes/promotionActionTypes";
import { action } from "../commons/actions";

// export function getPromotions() {
//   var request = axios({
//     method: "get",
//     url: `http://localhost:3000/api/promotions`
//   });

//   return {
//     type: ActionTypes.GET_PROMOTIONS,
//     payload: request
//   };
// }

// export function findPromotions(params) {
//   console.log("params", params);
//   var request = axios.post("http://localhost:3000/api/promotions/find", {
//     billValue: params.billValue,
//     promotionCode: params.promotionCode,
//     numberOfSeat: params.numberOfSeat
//   });

//   return {
//     type: ActionTypes.FIND_PROMOTIONS,
//     payload: request
//   };
// }

export const sagaActions = {
  getPromotions: {
    request: viewAction =>
      action(ActionTypes.GET_USERS_REQUEST_TYPE.REQUEST, {
        filterText: viewAction.filterText || ""
      }),
    success: (viewAction, response) =>
      action(ActionTypes.GET_USERS_REQUEST_TYPE.SUCCESS, {
        payload: {
          data: response.data
        }
      }),
    failure: (viewAction, error) =>
      action(ActionTypes.GET_USERS_REQUEST_TYPE.FAILURE, {
        error
      })
  },
  findPromotions: {
    request: viewAction =>
      action(ActionTypes.FIND_PROMOTIONS_REQUEST_TYPES.REQUEST, {
        billValue: viewAction.billValue,
        promotionCode: viewAction.promotionCode,
        numberOfSeat: viewAction.numberOfSeat
      }),
    success: (viewAction, response) =>
      action(ActionTypes.FIND_PROMOTIONS_REQUEST_TYPES.SUCCESS, {
        payload: {
          data: response.data
        }
      }),
    failure: (viewAction, error) =>
      action(ActionTypes.FIND_PROMOTIONS_REQUEST_TYPES.FAILURE, {
        error
      })
  }
};

export const viewActions = {
  findPromotions: ({ billValue, promotionCode, numberOfSeat }) =>
    action(ActionTypes.FIND_PROMOTIONS, { billValue, promotionCode, numberOfSeat }),
  getPromotions: () => action(ActionTypes.GET_PROMOTIONS, {})
};
