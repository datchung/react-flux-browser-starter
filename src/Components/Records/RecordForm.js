import React from "react";
import PropTypes from "prop-types";
import TextInput from "../Common/TextInput";
// import SelectInput from "../Common/SelectInput";

const RecordForm = ({
  record,
  // authors,
  onSave,
  onChange,
  saving = false,
  errors = {}
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{record.id ? "Edit" : "Add"} Record</h2>
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

      {/* <SelectInput
        name="authorId"
        label="Author"
        value={record.authorId || ""}
        defaultOption="Select Author"
        options={authors.map(author => ({
          value: author.id,
          text: author.name
        }))}
        onChange={onChange}
        error={errors.author}
      /> */}

      {/* <TextInput
        name="category"
        label="Category"
        value={record.category}
        onChange={onChange}
        error={errors.category}
      /> */}

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

RecordForm.propTypes = {
  // authors: PropTypes.array.isRequired,
  record: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default RecordForm;
