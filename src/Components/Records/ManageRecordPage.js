import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadRecords, saveRecord } from "../../Redux/Actions/RecordActions";
import T from '../../Localization/i18n';
import Back from "../Common/Back";
import PageTitle from "../Common/PageTitle";
import PropTypes from "prop-types";
import RecordForm from "./RecordForm";
import { newRecord } from "../../../tools/mockData";
// import Spinner from "../Common/Spinner";
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
        toast.error(
          String.format(T.t("loadingRecordsFailed"),
          error));
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
    const { text } = record;
    const errors = {};

    if (!text) errors.text = T.t("textError");

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
        toast.success(T.t("recordSaved"));
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
    <>
      <Back history={history} />
      <PageTitle 
        title={record.id ? T.t("editRecord") : T.t("createRecord")}
        />
      <RecordForm
        record={record}
        errors={errors}
        onChange={handleChange}
        onSave={handleSave}
        saving={saving}
      />
    </>
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
