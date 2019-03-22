import React from "react";
import { connect } from "react-redux";
import { liffHelper } from "../../App";
const Redirect = ({ liffData }) => {
  if (liffData === null) return <div> This should be redirect page lmao</div>;
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
