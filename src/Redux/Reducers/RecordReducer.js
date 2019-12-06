import * as types from "../Actions/ActionTypes";
import initialState from "./InitialState";

export default function recordReducer(state = initialState.records, action) {
  switch (action.type) {
    case types.SAVE_RECORD_SUCCESS:
      // New record
      if(!state.find(s => s.id === action.record.id))
        return [...state, action.record];
      
      // Update existing record
      return state.map(s => {
        return s.id != action.record.id ? s : action.record;
      });
    case types.TOGGLE_RECORD_SUCCESS:
      return state.map(s => {
        if(s.id != action.record.id) return s;
        return action.record;
      });
    case types.LOAD_RECORDS_SUCCESS:
    case types.FILTER_RECORDS_SUCCESS:
    case types.SORT_RECORDS_SUCCESS:
      return action.records;
    case types.DELETE_RECORD_SUCCESS:
      return state.filter(s => s.id != action.id);
    default:
      return state;
  }
}
