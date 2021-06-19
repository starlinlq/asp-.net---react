import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "./app/layout/styles.css";
import App from "./app/layout/App";
import reportWebVitals from "./reportWebVitals";
import { StoreContext, store } from "./app/stores/store";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "react-calendar/dist/Calendar.css";

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <Router>
      <App />
    </Router>
  </StoreContext.Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
