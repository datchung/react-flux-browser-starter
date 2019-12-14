import {setRecordPersistence, getRecords, getFilteredRecords} from "./RecordApi";
import uuid from 'uuid';

it("getRecords", function() {
  // arrange
  var mockPersistence = {};
  mockPersistence.getSavedRecords = function() {
    return [
      createRecord("text1", false),
      createRecord("text2", false)
    ]
  };
  setRecordPersistence(mockPersistence);

  // act
  var records = getRecords();

  // assert
  expect(records.length).toEqual(2);
});

test.each([
  ["notDone", "[{text:'text1',isComplete:false},{text:'text2',isComplete:false}]", "text1,text2"]
])("getFilteredRecords", (filter, allRecords, expectedRecords) => {
  // arrange
  var mockPersistence = {};
  mockPersistence.getSavedRecords = function() {
    return [
      createRecord("text1", false),
      createRecord("text2", false)
    ]
  };
  setRecordPersistence(mockPersistence);

  // act
  var actualRecords = getFilteredRecords("notDone");

  // assert
  expect(actualRecords.length).toEqual(2);
});

it("getFilteredRecords('notDone') all", function() {
  // arrange
  var mockPersistence = {};
  mockPersistence.getSavedRecords = function() {
    return [
      createRecord("text1", false),
      createRecord("text2", false)
    ]
  };
  setRecordPersistence(mockPersistence);

  // act
  var records = getFilteredRecords("notDone");

  // assert
  expect(records.length).toEqual(2);
});

it("getFilteredRecords('notDone') none", function() {
  // arrange
  var mockPersistence = {};
  mockPersistence.getSavedRecords = function() {
    return [
      createRecord("text1", true),
      createRecord("text2", true)
    ]
  };
  setRecordPersistence(mockPersistence);

  // act
  var records = getFilteredRecords("notDone");

  // assert
  expect(records.length).toEqual(0);
});

it("getFilteredRecords('notDone') some", function() {
  // arrange
  var mockPersistence = {};
  mockPersistence.getSavedRecords = function() {
    return [
      createRecord("text1", false),
      createRecord("text2", true)
    ]
  };
  setRecordPersistence(mockPersistence);

  // act
  var records = getFilteredRecords("notDone");

  // assert
  expect(records.length).toEqual(1);
  expect(records[0].text).toEqual("text1");
});

function createRecord(text, isComplete) {
  return {
    id: uuid(),
    text: text,
    isComplete: isComplete,
    dateCreated: + new Date(),
    dateModified: + new Date()
  }
}