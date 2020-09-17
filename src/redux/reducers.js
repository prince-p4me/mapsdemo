import { combineReducers } from "redux";
import employeeReducer from "./reducers/employee";
import userReducer from "./reducers/user";
import loaderReducer from "./reducers/loader";

const rootReducer = combineReducers({
  employees: employeeReducer,
  user: userReducer,
  isLoading: loaderReducer
})

export default rootReducer;