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

    var promise = new Promise(function(resolve, reject) {
      try {
        var records = recordApi.getRecords();
        resolve(records);
      }
      catch(error) {
        reject(error);
      }
    });
    return promise
      .then(records => {
        dispatch(loadRecordsSuccess(records));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveRecords(records) {
  return function(dispatch) {
    
    dispatch(beginApiCall());

    var promise = new Promise(function(resolve, reject) {
      try {
        recordApi.saveRecords(records);
        resolve(records);
      }
      catch(error) {
        reject(error);
      }
    });
    return promise
      .then(savedRecords => {
        dispatch(saveRecordsSuccess(savedRecords));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}