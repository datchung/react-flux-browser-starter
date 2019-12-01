import * as types from "./ActionTypes";
import { beginApiCall, apiCallError } from "./ApiStatusActions";
import * as recordApi from "../../Api/RecordApi";


export function loadRecordsSuccess(records) {
  return { type: types.LOAD_RECORDS_SUCCESS, records };
}

export function saveRecordSuccess(record) {
  return { type: types.SAVE_RECORD_SUCCESS, record };
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

export function saveRecord(record) {
  return function(dispatch) {
    
    dispatch(beginApiCall());

    var promise = new Promise(function(resolve, reject) {
      try {
        recordApi.saveRecord(record);
        resolve(record);
      }
      catch(error) {
        reject(error);
      }
    });
    return promise
      .then(savedRecord => {
        dispatch(saveRecordSuccess(savedRecord));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}