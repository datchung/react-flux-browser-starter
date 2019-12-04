import * as types from "./ActionTypes";
import { beginApiCall, apiCallError } from "./ApiStatusActions";
import * as recordApi from "../../Api/RecordApi";

export function loadRecordsSuccess(records) {
  return { type: types.LOAD_RECORDS_SUCCESS, records };
}

export function saveRecordSuccess(record) {
  return { type: types.SAVE_RECORD_SUCCESS, record };
}

export function toggleRecordSuccess(record) {
  return { type: types.TOGGLE_RECORD_SUCCESS, record };
}

export function deleteRecordSuccess(id) {
  return { type: types.DELETE_RECORD_SUCCESS, id };
}

export function filterRecordsSuccess(records) {
  return { type: types.FILTER_RECORDS_SUCCESS, records };
}

export function sortRecordsSuccess(records) {
  return { type: types.SORT_RECORDS_SUCCESS, records };
}

export function loadRecords() {
  return function(dispatch) {
    dispatch(beginApiCall());

    var promise = new Promise(function(resolve, reject) {
      try {
        resolve(recordApi.getRecords());
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

export function filterRecords(filter) {
  return function(dispatch) {
    dispatch(beginApiCall());

    var promise = new Promise(function(resolve, reject) {
      try {
        resolve(recordApi.getFilteredRecords(filter));
      }
      catch(error) {
        reject(error);
      }
    });
    return promise
      .then(records => {
        dispatch(filterRecordsSuccess(records));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function sortRecords(filter) {
  return function(dispatch) {
    dispatch(beginApiCall());

    var promise = new Promise(function(resolve, reject) {
      try {
        resolve(recordApi.getSortedRecords(filter));
      }
      catch(error) {
        reject(error);
      }
    });
    return promise
      .then(records => {
        dispatch(sortRecordsSuccess(records));
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
        resolve(recordApi.saveRecord(record));
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

export function toggleRecord(record) {
  return function(dispatch) {
    dispatch(beginApiCall());

    var promise = new Promise(function(resolve, reject) {
      try {
        resolve(recordApi.toggleRecord(record));
      }
      catch(error) {
        reject(error);
      }
    });
    return promise
      .then(savedRecord => {
        dispatch(toggleRecordSuccess(savedRecord));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteRecord(id) {
  return function(dispatch) {
    dispatch(beginApiCall());

    var promise = new Promise(function(resolve, reject) {
      try {
        resolve(recordApi.deleteRecord(id));
      }
      catch(error) {
        reject(error);
      }
    });
    return promise
      .then(() => {
        dispatch(deleteRecordSuccess(id));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}