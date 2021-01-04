import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import userReducer from "./userReducer";
import courseReducer from "./courseReducer";

const rootReducer = combineReducers({
  user: userReducer,
  login: loginReducer,
  course: courseReducer,
});

export default rootReducer;
