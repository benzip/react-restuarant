import { call, put } from "redux-saga/effects";

export function* sagaDispatcher(entity, apiFn, action, url) {
  yield put(entity.request(action));
  const obj = yield call(apiFn, url || action);
  const { response, error } = obj;
  if (response) {
    yield put(entity.success(action, response));
  } else {
    yield put(entity.failure(action, error));
  }
}
