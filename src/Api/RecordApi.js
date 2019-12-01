import RecordPersistence from './RecordPersistence';

export function getRecords() {
  return RecordPersistence.getSavedRecords();
}

export function saveRecords(records) {
  return RecordPersistence.saveRecords(records);
}
