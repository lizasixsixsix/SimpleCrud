import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";

import "./index.css";

import App from "./App";

const API = "api/";
const QUERY = "users";

ReactDOM.render(
  <BrowserRouter>
    <App apiUrl={API + QUERY} />
  </BrowserRouter>,
  document.getElementById("root")
);

registerServiceWorker();
