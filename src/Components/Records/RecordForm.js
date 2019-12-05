import React from "react";
import PropTypes from "prop-types";
import TextInput from "../Common/TextInput";
import T from '../../Localization/i18n';

const RecordForm = ({
  record,
  onSave,
  onChange,
  saving = false,
  errors = {}
}) => {
  return (
    <form onSubmit={onSave}>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="text"
        label="Todo"
        value={record.text}
        onChange={onChange}
        error={errors.text}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? T.t("saving") : T.t("save")}
      </button>
    </form>
  );
};

RecordForm.propTypes = {
  record: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default RecordForm;
