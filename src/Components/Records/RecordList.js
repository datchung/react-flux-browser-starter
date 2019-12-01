import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const RecordList = ({ records, onDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th />
        <th>Title</th>
        <th>Author</th>
        <th>Category</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {records.map(record => {
        return (
          <tr key={record.id}>
            <td>
              <a
                className="btn btn-light"
                href={"http://pluralsight.com/records/" + record.slug}
              >
                Watch
              </a>
            </td>
            <td>
              <Link to={"/record/" + record.slug}>{record.title}</Link>
            </td>
            <td>{record.authorName}</td>
            <td>{record.category}</td>
            <td>
              <button
                className="btn btn-outline-danger"
                // onClick={() => onDeleteClick(record)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

RecordList.propTypes = {
  records: PropTypes.array.isRequired,
  // onDeleteClick: PropTypes.func.isRequired
};

export default RecordList;
