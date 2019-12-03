import React from "react";
import PropTypes from "prop-types";
import Record from './Record';

const RecordList = ({ records, onToggleClick, onDeleteClick }) => (
  <>
    {records.map(record => {
      return (
        <div
          key={record.id}
          className="card"
          >
            <div
              className="card-content"
              >
              <Record
                record={record}
                onToggleClick={onToggleClick}
                onDeleteClick={onDeleteClick}
                />
            </div>
        </div>
      );
    })}
  </>
);

RecordList.propTypes = {
  records: PropTypes.array.isRequired,
  onToggleClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default RecordList;
