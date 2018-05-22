import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";

const API = "api/";
const QUERY = "values";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: []
    };
  }

  componentDidMount() {
    fetch(API + QUERY)
      .then(response => response.json())
      .then(data => this.setState({ values: data }));
  }

  render() {
    const { values } = this.state;

    return (
      <div>
      {values.map(value =>
        <div key={value.value1}>
          {value.value1} {value.value2}
        </div>
      )}
    </div>
    );
  }
}

export default App;
