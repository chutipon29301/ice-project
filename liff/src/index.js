import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import store from "./store";
import { Provider } from "react-redux";
import Axios from "axios";

export const END_POINT = "https://api.lockerswarm.xyz";
// if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
//   END_POINT = "https://10e2f066.ngrok.io";
// } else {
//   END_POINT = REACT_APP_PRODUCTION_ENDPOINT
// }

Axios.defaults.baseURL = END_POINT;
Axios.defaults.headers.post["Content-Type"] = "application/json";
Axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");

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
