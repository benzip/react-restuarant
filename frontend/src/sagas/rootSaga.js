import { fork } from "redux-saga/effects";
import promotionSaga from "./promotionSaga";
export default function* rootSaga() {
  yield [fork(promotionSaga)];
}
