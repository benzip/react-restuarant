import * as ActionTypes from "../actiontypes/promotionActionTypes";
import { action } from "../commons/actions";

export const sagaActions = {
  getPromotions: {
    request: viewAction => action(ActionTypes.GET_PROMOTIONS_REQUEST_TYPE.REQUEST),
    success: (viewAction, response) =>
      action(ActionTypes.GET_PROMOTIONS_REQUEST_TYPE.SUCCESS, {
        payload: {
          data: response.data
        }
      }),
    failure: (viewAction, error) =>
      action(ActionTypes.GET_PROMOTIONS_REQUEST_TYPE.FAILURE, {
        error
      })
  },
  findPromotions: {
    request: viewAction =>
      action(ActionTypes.FIND_PROMOTIONS_REQUEST_TYPE.REQUEST, {
        billValue: viewAction.billValue,
        promotionCode: viewAction.promotionCode,
        numberOfSeat: viewAction.numberOfSeat
      }),
    success: (viewAction, response) =>
      action(ActionTypes.FIND_PROMOTIONS_REQUEST_TYPE.SUCCESS, {
        payload: {
          data: response.data
        }
      }),
    failure: (viewAction, error) =>
      action(ActionTypes.FIND_PROMOTIONS_REQUEST_TYPE.FAILURE, {
        error
      })
  }
};

export const viewActions = {
  findPromotions: ({ billValue, promotionCode, numberOfSeat }) =>
    action(ActionTypes.FIND_PROMOTIONS, { billValue, promotionCode, numberOfSeat }),
  getPromotions: () => action(ActionTypes.GET_PROMOTIONS, {})
};
