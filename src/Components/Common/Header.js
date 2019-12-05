import React from "react";
import { NavLink } from "react-router-dom";
import T from '../../Localization/i18n';

const Header = () => {
  const activeStyle = { color: "#F15B2A" };
  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        {T.t("home")}
      </NavLink>
      {" | "}
      <NavLink to="/records" activeStyle={activeStyle}>
        {T.t("recordsTitle")}
      </NavLink>
      {" | "}
      <NavLink to="/about" activeStyle={activeStyle}>
        {T.t("about")}
      </NavLink>
    </nav>
  );
};

export default Header;
