import * as ActionTypes from "../actiontypes/promotionActionTypes";
import { sagaActions } from "./../actionCreators/promotionActionCreator";
import { takeLatest } from "redux-saga/effects";
import * as svcPromotions from "../services/promotionServices";
import { sagaDispatcher } from "./commons";

export const getPromotions = sagaDispatcher.bind(null, sagaActions.getPromotions, svcPromotions.getPromotions);
export const findPromotions = sagaDispatcher.bind(null, sagaActions.findPromotions, svcPromotions.findPromotions);
export const applyPromotions = sagaDispatcher.bind(null, sagaActions.applyPromotions, svcPromotions.applyPromotions);

export const findAndApplyPromotions = sagaDispatcher.bind(null, sagaActions.findAndApplyPromotions, svcPromotions.findAndApplyPromotions);
export default function* promotionSaga() {
  yield takeLatest(ActionTypes.GET_PROMOTIONS, getPromotions);
  yield takeLatest(ActionTypes.FIND_PROMOTIONS, findPromotions);
  yield takeLatest(ActionTypes.APPLY_PROMOTIONS, applyPromotions);
  yield takeLatest(ActionTypes.FIND_AND_APPLY_PROMOTIONS, findAndApplyPromotions);
}
