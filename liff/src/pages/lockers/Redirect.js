import React from "react";
import { connect } from "react-redux";
import { liffHelper } from "../../App";
import { Redirect as ReactRedirect } from "react-router-dom";

const Redirect = ({ liffData }) => {
  if (liffData === null) return <ReactRedirect to="/find-lockers" />;
  else {
    liffHelper.openExternal(
      "https://ice-project-liff.herokuapp.com/find-lockers",
      true
    );
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#2979ff",
          width: "100vw",
          height: "100vh"
        }}
      >
        <div className="lds-roller">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  liffData: state.liff.data
});

export default connect(mapStateToProps)(Redirect);
