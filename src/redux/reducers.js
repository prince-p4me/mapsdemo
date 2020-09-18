import { combineReducers } from "redux";
import itemReducer from "./reducers/item";
import loaderReducer from "./reducers/loader";

const rootReducer = combineReducers({
  items: itemReducer,
  isLoading: loaderReducer
})

export default rootReducer;