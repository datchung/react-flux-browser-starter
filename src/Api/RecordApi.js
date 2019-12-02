import RecordPersistence from './RecordPersistence';
import uuid from 'uuid';

var recordPersistence = RecordPersistence;
export function setRecordPersistence(rp) {
  recordPersistence = rp;
}

export function getRecords() {
  return recordPersistence.getSavedRecords();
}

export function saveRecord(record) {
  var records = recordPersistence.getSavedRecords();

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

  recordPersistence.saveRecords(modifiedRecords);
  return record;
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
