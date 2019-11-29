import { combineReducers } from "redux";
import courses from "./CourseReducer";
import authors from "./AuthorReducer";
import records from "./RecordReducer";
import apiCallsInProgress from "./ApiStatusReducer";

const rootReducer = combineReducers({
  courses,
  authors,
  records,
  apiCallsInProgress
});

export default rootReducer;
