import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import store from "./store";
import { Provider } from "react-redux";
import Axios from "axios";

let END_POINT;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  END_POINT = "http://localhost";
} else {
  END_POINT = "https://api.lockerswarm.xyz";
}

Axios.defaults.baseURL = END_POINT;
Axios.defaults.headers.post["Content-Type"] = "application/json";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
