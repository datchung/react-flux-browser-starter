// import uuid from 'uuid';
import * as types from "../Actions/ActionTypes";
import initialState from "./InitialState";

export default function recordReducer(state = initialState.records, action) {
  switch (action.type) {
    case types.SAVE_RECORDS_SUCCESS:
      return action.records;
    case types.LOAD_RECORDS_SUCCESS:
      return action.records;
    // case types.ADD_RECORD:
    //   // Don't add records with no text.
    //   if (!action.text) {
    //     return state;
    //   }

    //   var dateCreated = + new Date();
    //   var modifiedState = [
    //     ...state, 
    //     {
    //       id: uuid(),
    //       text: action.text,
    //       dateCreated: dateCreated,
    //       dateModified: dateCreated
    //     }
    //   ];

    //   return modifiedState;
    // case types.UPDATE_RECORD:
    //   var record = state.find(s => s.id === action.record.id);
    //   if(!record) return state;

    //   var modifiedState = state.map(s => {
    //     if(s.id !== action.record.id) return s;
        
    //     return {
    //       id: s.id,
    //       text: action.record.text,
    //       dateCreated: s.dateCreated,
    //       dateModified: + new Date()
    //     };
    //   });

    //   return modifiedState;
    // case types.DELETE_RECORD:
    //     if(!state.find(s => s.id === action.id)) return state;

    //     var modifiedState = state.filter(s => s.id != action.id);

    //     return modifiedState;
    default:
      return state;
  }
}
