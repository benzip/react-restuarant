import * as ActionTypes from "../actiontypes/promotionActionTypes";
import { sagaActions } from "./../actionCreators/promotionActionCreator";

import { call, put, takeEvery, takeLatest, take } from "redux-saga/effects";
import { delay } from "redux-saga";
import { api } from "../services";

function* fetchEntity(entity, apiFn, action, url) {
  yield put(entity.request(action));
  const { response, error } = yield call(apiFn, url || action);
  if (response) {
    yield put(entity.success(action, response));
  } else {
    yield put(entity.failure(action, error));
  }
}

export const getPromotions = fetchEntity.bind(null, sagaActions.getUsers, api.getUsers);
export const findPromotions = fetchEntity.bind(null, sagaActions.getUser, api.getUser);

export default function* promotionSaga() {
  yield takeLatest(ActionTypes.GET_PROMOTIONS, getPromotions);
  yield takeLatest(ActionTypes.FIND_PROMOTIONS, findPromotions);
}