import React from "react";
import PropTypes from "prop-types";

const PageTitle = ({title}) => {
  return (
    <div className="columns">
      <div className="column">
        <h5 className="title is-5">{title}</h5>
      </div>
    </div>
  );
};

PageTitle.propTypes = {
  title: PropTypes.string.isRequired
};

export default PageTitle;