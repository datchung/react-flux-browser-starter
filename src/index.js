import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bulma/css/bulma.min.css";
import App from "./Components/App";
import "./index.css";
import configureStore from "./Redux/ConfigureStore";
import { Provider as ReduxProvider } from "react-redux";

const store = configureStore();

render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById("app")
);
