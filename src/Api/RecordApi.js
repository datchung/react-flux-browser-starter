import RecordPersistence from './RecordPersistence';
import uuid from 'uuid';

var recordPersistence = RecordPersistence;
export function setRecordPersistence(rp) {
  recordPersistence = rp;
}

export function getRecords() {
  return recordPersistence.getSavedRecords();
}

export function getFilteredRecords(filter) {
  var records = recordPersistence.getSavedRecords();
  
  switch(filter) {
    case "notDone":
      return records.filter(r => !r.isComplete);
    case "done":
        return records.filter(r => r.isComplete);
    default:
        return records;
  }
}

export function getSortedRecords(sort) {
  var records = recordPersistence.getSavedRecords();
  
  switch(sort) {
    case "newestFirst":
      return records.sort(compareRecordsDescending);
    case "oldestFirst":
      return records.sort(compareRecordsAscending);
    default:
      return records;
  }
}

function compareRecordsDescending(r1, r2) {
  if(r1.dateModified < r2.dateModified) return 1;
  if(r1.dateModified > r2.dateModified) return -1;
  return 0;
}

function compareRecordsAscending(r1, r2) {
  if(r1.dateModified < r2.dateModified) return -1;
  if(r1.dateModified > r2.dateModified) return 1;
  return 0;
}

export function saveRecord(record) {
  var records = recordPersistence.getSavedRecords();

  if(!record.id || !records) {
    // Add new record
    record.id = uuid();
    record.isComplete = false;
    record.dateCreated = + new Date();
    record.dateModified = + record.dateCreated;
    saveRecords([...records, record]);
    return record;
  }

  // Update existing record
  return updateRecord(records, record);
}

function updateRecord(records, record) {
  var modifiedRecords = records.map(r => {
    if(r.id !== record.id) return r;
    record = {
      ...r,
      text: record.text,
      isComplete: record.isComplete,
      dateModified: + new Date()
    };
    return record;
  });

  recordPersistence.saveRecords(modifiedRecords);
  return record;
}

export function toggleRecord(record) {
  return saveRecord({
    ...record,
    isComplete: !record.isComplete
  });
}

export function deleteRecord(id) {
  var records = recordPersistence.getSavedRecords();

  if(!records) return;
  if(!records.find(r => r.id === id)) return;

  var modifiedRecords = records.filter(r => r.id != id);
  
  recordPersistence.saveRecords(modifiedRecords);
  return modifiedRecords;
}

function saveRecords(records) {
  return recordPersistence.saveRecords(records);
}
