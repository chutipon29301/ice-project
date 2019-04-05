import React, { Component } from "react";
import "./App.css";
import MainRouter from "./routes";
import { connect } from "react-redux";
import { setLiff, setInitialURL } from "./reducers/liff";

const liff = window.liff;

class App extends Component {
  componentWillMount() {
    window.addEventListener("load", this.initialize);
    const { setInitialURL } = this.props;
    if (!window.location.href.includes("/auth/line-landing")) {
      const path = window.location.href.split("/")[3];
      localStorage.setItem("path", path);
      setInitialURL(path);
    }
    setInitialURL(localStorage.getItem("path"));
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
  setLiff,
  setInitialURL
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
