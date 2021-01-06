import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import userReducer from "./userReducer";
import courseReducer from "./courseReducer";
import selectedCourseReducer from "./selectedCourseReducer";

const rootReducer = combineReducers({
  user: userReducer,
  login: loginReducer,
  course: courseReducer,
  selectCourse: selectedCourseReducer,
});

export default rootReducer;
