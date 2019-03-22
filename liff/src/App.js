import React, { Component } from "react";
import "./App.css";
import MainRouter from "./routes";
import { connect } from "react-redux";
import { setLiff } from "./reducers/liff";

const liff = window.liff;

class App extends Component {
  componentDidMount() {
    window.addEventListener("load", this.initialize);
  }
  initialize = () => {
    liff.init(data => {
      this.props.setLiff(data);
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

const mapDispatchToProps = {
  setLiff
};

export default connect(
  null,
  mapDispatchToProps
)(App);

class LiffHelper {
  openExternal(url, external) {
    if (liff) {
      liff.openWindow({ url: url, external: external });
    } else {
      console.log("eiei");
    }
  }
}

export const liffHelper = new LiffHelper();
