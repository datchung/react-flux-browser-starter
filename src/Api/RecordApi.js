import RecordPersistence from './RecordPersistence';
import uuid from 'uuid';

export function getRecords() {
  return RecordPersistence.getSavedRecords();
}

export function saveRecord(record) {
  var records = RecordPersistence.getSavedRecords();

  if(!record.id) {
    // Add new record
    record.id = uuid();
    saveRecords([...records, record]);
    return record;
  }

  // Update existing record
}

function saveRecords(records) {
  return RecordPersistence.saveRecords(records);
}
