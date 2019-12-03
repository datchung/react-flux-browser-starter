import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import T from '../../Localization/i18n';

const Record = ({ record, onToggleClick, onDeleteClick }) => (
  <>
    <div className="columns">
      <div className="column is-narrow">
        <input
          type="checkbox"
          checked={record.isComplete}
          onChange={() => onToggleClick(record)}
          />
      </div>
      <div className="column">
        <Link to={"/record/" + record.id}>
          {record.isComplete
            ? <del>{record.text}</del>
            : <p>{record.text}</p>}
        </Link>
      </div>
      <div className="column is-narrow">
        <button
          onClick={() => onDeleteClick(record)}
          className="button is-small"
          >
          {T.t("delete")}
        </button>
      </div>
    </div>
  </>
);

Record.propTypes = {
  record: PropTypes.object.isRequired,
  onToggleClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default Record;