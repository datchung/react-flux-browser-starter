import React from "react";
import PropTypes from "prop-types";

const TextAreaInput = ({ name, label, onChange, rows, value, error }) => {
  let wrapperClass = "field";
  if (error && error.length > 0) {
    wrapperClass += " has-text-danger";
  }

  return (
    <div className={wrapperClass}>
      {label && <label className="label">{label}</label>}
      <div className="control">
        <textarea
          className="textarea"
          rows={rows}
          name={name}
          value={value}
          onChange={onChange}
          />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

TextAreaInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  rows: PropTypes.string.isRequired,
  value: PropTypes.string,
  error: PropTypes.string
};

export default TextAreaInput;
