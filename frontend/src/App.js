import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "antd-mobile";

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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Button> Test AntdMobile</Button>
        </header>
      </div>
    );
  }
}

export default App;