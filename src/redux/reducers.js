import { combineReducers } from "redux";
import employeeReducer from "./reducers/employee";
import userReducer from "./reducers/user";

const rootReducer = combineReducers({
  employees: employeeReducer,
  user: userReducer,
})

export default rootReducer;