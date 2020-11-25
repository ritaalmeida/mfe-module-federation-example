import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Router from "./Router";

import "./styles/base.css";
import store from "./store";
import "./styles/index.css";

const Shell = () => (
  <Provider store={store}>
    <div className="site">
      <Router  />
    </div>
  </Provider>
);

ReactDOM.render(<Shell />, document.getElementById("app"));

