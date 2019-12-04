import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Back from "../Common/Back";
import PageTitle from "../Common/PageTitle";

const HomePage = (props) => (
  <>
    <Back history={props.history} />
    <PageTitle title="Record App" />
    <p>React, Redux and React Router for ultra-responsive web apps.</p>
    <Link to="about" className="btn btn-primary btn-lg">
      Learn more
    </Link>
  </>
);

HomePage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default HomePage;
