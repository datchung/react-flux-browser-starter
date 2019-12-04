import React from "react";
import PropTypes from "prop-types";
import Back from "../Common/Back";
import PageTitle from "../Common/PageTitle";

const AboutPage = (props) => (
  <>
    <Back history={props.history} />
    <PageTitle title="About" />
    <p>This app uses React, Redux, React Router, and many other helpful
      libraries.</p>
  </>
);

AboutPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default AboutPage;
