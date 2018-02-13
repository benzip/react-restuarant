import { applyMiddleware, createStore, compose } from "redux";
import rootReducer from "./reducers/rootReducer";
import promise from 'redux-promise';
import logger from "redux-logger";
export default function configureStore(initialState) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const middleware = applyMiddleware(promise,logger);
  const store = createStore(rootReducer, {}, composeEnhancers(middleware));

  return store;
}
