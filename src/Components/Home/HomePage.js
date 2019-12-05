import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Back from "../Common/Back";
import PageTitle from "../Common/PageTitle";
import T from '../../Localization/i18n';

const HomePage = (props) => (
  <>
    <Back history={props.history} />
    <PageTitle title={T.t("appTitle")}/>
    <p>{T.t("homeText")}</p>
    <Link to="about" className="btn btn-primary btn-lg">
      {T.t("learnMore")}
    </Link>
  </>
);

HomePage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default HomePage;
