import React from "react";
import { connect } from "react-redux";
import { liffHelper } from "../../App";
import { Redirect as ReactRedirect } from "react-router-dom";

const Redirect = ({ liffData }) => {
  if (liffData === null) return <ReactRedirect to="/open-locker" />;
  else {
    liffHelper.openExternal(
      "https://ice-project-liff.herokuapp.com/open-locker",
      true
    );
    return <h1> Loading... </h1>;
  }
};

const mapStateToProps = state => ({
  liffData: state.liff.data
});

export default connect(mapStateToProps)(Redirect);
