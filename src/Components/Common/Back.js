import React from "react";
import PropTypes from "prop-types";
import T from '../../Localization/i18n';

const Back = ({history}) => {
  function onBackClick() {
    history.goBack();
  }

  return (
    <div className="columns">
      <div className="column">
        <button
          className="button"
          onClick={() => onBackClick()}
          >
          {T.t("back")}
        </button>
      </div>
    </div>
  );
};

Back.propTypes = {
  history: PropTypes.object.isRequired
};

export default Back;