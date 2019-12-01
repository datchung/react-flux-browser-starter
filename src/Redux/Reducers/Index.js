import { combineReducers } from "redux";
import records from "./RecordReducer";
import apiCallsInProgress from "./ApiStatusReducer";

const rootReducer = combineReducers({
  records,
  apiCallsInProgress
});

export default rootReducer;
