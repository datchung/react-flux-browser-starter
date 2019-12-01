import * as types from "../Actions/ActionTypes";
import initialState from "./InitialState";

export default function recordReducer(state = initialState.records, action) {
  switch (action.type) {
    case types.SAVE_RECORD_SUCCESS:
      return [...state, { ...action.record }];
    case types.LOAD_RECORDS_SUCCESS:
      return action.records;
    case types.DELETE_RECORD_SUCCESS:
      return state.filter(s => s.id != action.id);
    default:
      return state;
  }
}
