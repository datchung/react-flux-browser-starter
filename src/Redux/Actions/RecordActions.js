//import * as types from "./actionTypes";
import * as recordApi from "../../Api/RecordApi";

export function loadRecords() {
  return function() {
    return recordApi.getRecords();
  };
}

export function saveRecords(records) {
  return function() {
    return recordApi
      .saveRecords(records);
  };
}