import { applyMiddleware, createStore, compose } from "redux";
import rootReducer from "./reducers/rootReducer";
import promise from "redux-promise";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/rootSaga";
export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const middleware = applyMiddleware(sagaMiddleware, promise, logger);
  const store = createStore(rootReducer, {}, composeEnhancers(middleware));

  sagaMiddleware.run(rootSaga);
  return store;
}
