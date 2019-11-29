import * as types from "./ActionTypes";
import { beginApiCall, apiCallError } from "./ApiStatusActions";
import * as recordApi from "../../Api/RecordApi";


export function loadRecordsSuccess(records) {
  return { type: types.LOAD_RECORDS_SUCCESS, records };
}

export function saveRecordsSuccess(records) {
  return { type: types.SAVE_RECORDS_SUCCESS, records };
}

export function loadRecords() {
  return function(dispatch) {
    dispatch(beginApiCall());
    try {
      var records = recordApi.getRecords();
      dispatch(loadRecordsSuccess(records));
    }
    catch(error) {
      dispatch(apiCallError(error));
    }
  };
}

export function saveRecords(records) {
  return function(dispatch) {
    dispatch(beginApiCall());
    try {
      recordApi.saveRecords(records);
      dispatch(saveRecordsSuccess(records));
    }
    catch(error) {
      dispatch(apiCallError(error));
    }
  };
}

// export function loadRecords() {
//   return function() {
//     return recordApi.getRecords();
//   };
// }

// export function saveRecords(records) {
//   return function() {
//     return recordApi
//       .saveRecords(records);
//   };
// }