import React from "react";
import PropTypes from "prop-types";
import TextAreaInput from "../Common/TextAreaInput";
import T from '../../Localization/i18n';

const RecordForm = ({
  record,
  onSave,
  onChange,
  saving = false,
  errors = {}
}) => {
  return (
    <div className="columns">
      <div className="column">
        <form onSubmit={onSave}>
          {errors.onSave && (
            <div className="alert alert-danger" role="alert">
              {errors.onSave}
            </div>
          )}

          <div className="field">
            <div className="control">
              <TextAreaInput
                name="text"
                label=""
                rows="8"
                value={record.text}
                onChange={onChange}
                error={errors.text}
                />
            </div>
          </div>
          
          <div className="field">
            <div className="control">
              <button
                type="submit"
                className="button is-primary"
                >
                {saving ? T.t("saving") : T.t("save")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
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
