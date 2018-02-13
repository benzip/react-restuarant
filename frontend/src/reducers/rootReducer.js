import { combineReducers } from "redux";
import promotionReducer from "./promotionReducer";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
  promotionReducer,
  form: formReducer
});

export default rootReducer;
