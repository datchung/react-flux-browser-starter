import React from "react";
import PropTypes from "prop-types";
import Back from "../Common/Back";
import PageTitle from "../Common/PageTitle";
import T from '../../Localization/i18n';

const AboutPage = (props) => (
  <>
    <Back history={props.history} />
    <PageTitle title={T.t("about")} />
    <p>{T.t("aboutText")}</p>
  </>
);

AboutPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default AboutPage;
