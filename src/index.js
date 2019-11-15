import React from "react";
import { render } from "react-dom";
import { HashRouter as Router } from 'react-router-dom';
import AppPage from "./components/Pages/AppPage";
import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";
import i18n, {i18nOptions} from './localization/i18n';
import 'bulma/css/bulma.min.css';
import "./index.css";

const store = configureStore();

if (!String.format) {
  String.format = function(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number] 
        : match
      ;
    });
  };
}

i18n.init(i18nOptions)
  .then(function(t) {
    render(
      <ReduxProvider store={store}>
        <Router>
          <AppPage />
        </Router>
      </ReduxProvider>,
      document.getElementById("appContainer")
    );
  });