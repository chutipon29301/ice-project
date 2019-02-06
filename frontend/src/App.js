import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import MainRouter from "./routes";
// import TestHook from "./TestHook";
const liff = window.liff;

class App extends Component {
  componentDidMount() {
    window.addEventListener("load", this.initialize);
  }
  initialize = () => {
    liff.init(data => {
      console.log(data, "data");
    });
  };
  render() {
    return (
      <div className="App">
        <MainRouter />
      </div>
    );
  }
}

export default App;
