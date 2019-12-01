import RecordPersistence from './RecordPersistence';
import uuid from 'uuid';

export function getRecords() {
  return RecordPersistence.getSavedRecords();
}

export function saveRecord(record) {
  var records = RecordPersistence.getSavedRecords();

  if(!record.id || !records) {
    // Add new record
    record.id = uuid();
    record.dateCreated = + new Date();
    record.dateModified = + record.dateCreated;
    saveRecords([...records, record]);
    return record;
  }

  // Update existing record
  var modifiedRecords = records.map(r => {
    if(r.id !== record.id) return r;
    
    record = {
      id: r.id,
      text: record.text,
      dateCreated: r.dateCreated,
      dateModified: + new Date()
    };
    return record;
  });

  RecordPersistence.saveRecords(modifiedRecords);
  return record;
}

function saveRecords(records) {
  return RecordPersistence.saveRecords(records);
}
