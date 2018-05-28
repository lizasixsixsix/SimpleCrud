import React from "react";

import "./App.css";

import Navigation from "./Components/Navigation";
import Main from "./Components/Main";

const App = props => (
  <div className="App">
    <Navigation apiUrl={props.apiUrl} />
    <Main apiUrl={props.apiUrl} />
  </div>
);

export default App;
