import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bulma/css/bulma.min.css";
import App from "./Components/App";
import "./index.css";
import configureStore from "./Redux/ConfigureStore";
import { Provider as ReduxProvider } from "react-redux";
import i18n, {i18nOptions} from './Localization/i18n';

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

const store = configureStore();

i18n.init(i18nOptions)
  .then(function() {
    render(
      <ReduxProvider store={store}>
        <Router>
          <App />
        </Router>
      </ReduxProvider>,
      document.getElementById("app")
    );
  });