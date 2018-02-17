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
  },
  applyPromotions: {
    request: viewAction => {
      return action(ActionTypes.APPLY_PROMOTIONS_REQUEST_TYPE.REQUEST, { promotions: viewAction.promotions });
    },
    success: (viewAction, response) =>
      action(ActionTypes.APPLY_PROMOTIONS_REQUEST_TYPE.SUCCESS, {
        payload: {
          data: response.data
        }
      }),
    failure: (viewAction, error) =>
      action(ActionTypes.APPLY_PROMOTIONS_REQUEST_TYPE.FAILURE, {
        error
      })
  },
  findAndApplyPromotions: {
    request: viewAction => {
      const { promotions, billValue, promotionCode, numberOfSeat } = viewAction;
      return action(ActionTypes.FIND_AND_APPLY_PROMOTIONS_REQUEST_TYPE.REQUEST, { promotions, billValue, promotionCode, numberOfSeat });
    },
    success: (viewAction, response) =>
      action(ActionTypes.FIND_AND_APPLY_PROMOTIONS_REQUEST_TYPE.SUCCESS, {
        payload: {
          data: response.data
        }
      }),
    failure: (viewAction, error) =>
      action(ActionTypes.FIND_AND_APPLY_PROMOTIONS_REQUEST_TYPE.FAILURE, {
        error
      })
  },
  getPromotionHeader: {
    request: viewAction => {
      const { id } = viewAction;
      return action(ActionTypes.GET_PROMOTION_HEADER_REQUEST_TYPE.REQUEST, { id });
    },
    success: (viewAction, response) =>
      action(ActionTypes.GET_PROMOTION_HEADER_REQUEST_TYPE.SUCCESS, {
        payload: {
          data: response.data
        }
      }),
    failure: (viewAction, error) =>
      action(ActionTypes.GET_PROMOTION_HEADER_REQUEST_TYPE.FAILURE, {
        error
      })
  },
  getPromotionDetails: {
    request: viewAction => {
      const { headerId } = viewAction;
      return action(ActionTypes.GET_PROMOTION_DETAILS_REQUEST_TYPE.REQUEST, { headerId });
    },
    success: (viewAction, response) =>
      action(ActionTypes.GET_PROMOTION_DETAILS_REQUEST_TYPE.SUCCESS, {
        payload: {
          data: response.data
        }
      }),
    failure: (viewAction, error) =>
      action(ActionTypes.GET_PROMOTION_DETAILS_REQUEST_TYPE.FAILURE, {
        error
      })
  },
  getPromotionDetail: {
    request: viewAction => {
      const { id } = viewAction;
      return action(ActionTypes.GET_PROMOTION_DETAIL_REQUEST_TYPE.REQUEST, { id });
    },
    success: (viewAction, response) =>
      action(ActionTypes.GET_PROMOTION_DETAIL_REQUEST_TYPE.SUCCESS, {
        payload: {
          data: response.data
        }
      }),
    failure: (viewAction, error) =>
      action(ActionTypes.GET_PROMOTION_DETAIL_REQUEST_TYPE.FAILURE, {
        error
      })
  }
};

export const viewActions = {
  // findPromotions: ({ billValue, promotionCode, numberOfSeat }) => action(ActionTypes.FIND_PROMOTIONS, { billValue, promotionCode, numberOfSeat }),
  getPromotions: () => action(ActionTypes.GET_PROMOTIONS, {}),
  // applyPromotions: promotions => action(ActionTypes.APPLY_PROMOTIONS, { promotions }),
  findAndApplyPromotions: ({ billValue, promotionCode, numberOfSeat, promotions }) => action(ActionTypes.FIND_AND_APPLY_PROMOTIONS, { promotions, billValue, promotionCode, numberOfSeat }),
  getPromotionHeader: id => action(ActionTypes.GET_PROMOTION_HEADER, { id }),
  getPromotionDetails: headerId => action(ActionTypes.GET_PROMOTION_DETAILS, { headerId }),
  getPromotionDetail: id => action(ActionTypes.GET_PROMOTION_DETAIL, { id })
};
