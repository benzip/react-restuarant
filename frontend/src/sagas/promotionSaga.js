import * as ActionTypes from "../actiontypes/promotionActionTypes";
import { sagaActions } from "./../actionCreators/promotionActionCreator";
import { takeLatest, put, call } from "redux-saga/effects";
import * as svcPromotions from "../services/promotionServices";
import { sagaDispatcher } from "./commons";

export const getPromotionHeaders = sagaDispatcher.bind(null, sagaActions.getPromotionHeaders, svcPromotions.getPromotionHeaders);
export const findAndApplyPromotions = sagaDispatcher.bind(null, sagaActions.findAndApplyPromotions, svcPromotions.findAndApplyPromotions);
export const getPromotionHeader = sagaDispatcher.bind(null, sagaActions.getPromotionHeader, svcPromotions.getPromotionHeader);
export const getPromotionDetails = sagaDispatcher.bind(null, sagaActions.getPromotionDetails, svcPromotions.getPromotionDetails);
export const getPromotionDetail = sagaDispatcher.bind(null, sagaActions.getPromotionDetail, svcPromotions.getPromotionDetail);
export const savePromotionHeader = sagaDispatcher.bind(null, sagaActions.savePromotionHeader, action => {
  return svcPromotions.savePromotionHeader(action).then(() => svcPromotions.getPromotionHeaders());
});
export const deletePromotionHeader = sagaDispatcher.bind(null, sagaActions.deletePromotionHeader, svcPromotions.deletePromotionHeader);
export const savePromotionDetail = sagaDispatcher.bind(null, sagaActions.savePromotionDetail, action => {
  return svcPromotions.savePromotionDetail(action).then(() => svcPromotions.getPromotionDetails({ headerId: action.promotionDetail.header_id }));
});
export const deletePromotionDetail = sagaDispatcher.bind(null, sagaActions.deletePromotionDetail, svcPromotions.deletePromotionDetail);
export default function* promotionSaga() {
  yield takeLatest(ActionTypes.GET_PROMOTION_HEADERS, getPromotionHeaders);
  yield takeLatest(ActionTypes.FIND_AND_APPLY_PROMOTIONS, findAndApplyPromotions);
  yield takeLatest(ActionTypes.GET_PROMOTION_HEADER, getPromotionHeader);
  yield takeLatest(ActionTypes.GET_PROMOTION_DETAILS, getPromotionDetails);
  yield takeLatest(ActionTypes.GET_PROMOTION_DETAIL, getPromotionDetail);
  yield takeLatest(ActionTypes.SAVE_PROMOTION_HEADER, savePromotionHeader);
  yield takeLatest(ActionTypes.DELETE_PROMOTION_HEADER, deletePromotionHeader);
  yield takeLatest(ActionTypes.SAVE_PROMOTION_DETAIL, savePromotionDetail);
  yield takeLatest(ActionTypes.DELETE_PROMOTION_DETAIL, deletePromotionDetail);
}
