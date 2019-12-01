import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadRecords, saveRecord } from "../../Redux/Actions/RecordActions";
import PropTypes from "prop-types";
import RecordForm from "./RecordForm";
import { newRecord } from "../../../tools/mockData";
import Spinner from "../Common/Spinner";
import { toast } from "react-toastify";

export function ManageRecordPage({
  records,
  loadRecords,
  saveRecord,
  history,
  ...props
}) {
  const [record, setRecord] = useState({ ...props.record });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (records.length === 0) {
      loadRecords().catch(error => {
        alert("Loading records failed" + error);
      });
    } else {
      setRecord({ ...props.record });
    }
  }, [props.record]);

  function handleChange(event) {
    const { name, value } = event.target;
    setRecord(prevRecord => ({
      ...prevRecord,
      [name]: value
    }));
  }

  function formIsValid() {
    // const { title, authorId, category } = record;
    const errors = {};

    // if (!title) errors.title = "Title is required.";
    // if (!authorId) errors.author = "Author is required";
    // if (!category) errors.category = "Category is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveRecord(record)
      .then(() => {
        toast.success("Record saved.");
        history.push("/records");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  // return records.length === 0 ? (
  //   <Spinner />
  // ) : 
  return (
    <RecordForm
      record={record}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageRecordPage.propTypes = {
  record: PropTypes.object.isRequired,
  records: PropTypes.array.isRequired,
  loadRecords: PropTypes.func.isRequired,
  saveRecord: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getRecordById(records, id) {
  return records.find(record => record.id === id) || null;
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  const record =
    id && state.records.length > 0
      ? getRecordById(state.records, id)
      : newRecord;
  return {
    record,
    records: state.records
  };
}

const mapDispatchToProps = {
  loadRecords,
  saveRecord
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageRecordPage);
