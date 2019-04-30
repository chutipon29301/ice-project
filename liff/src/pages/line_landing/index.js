import React from "react";
import Axios from "axios";
import { setTokenAndExpiration, setAuthentication } from "../../auth/ducks";
import { connect } from "react-redux";

class LineLanding extends React.Component {
  async componentDidMount() {
    const { history, setTokenAndExpiration, initialURL } = this.props;
    initAxiosLineErrorHandling(history);
    const location = window.location.href;
    const indexOfCode = location.indexOf("code=") + 5;
    const indexOfLocation = location.indexOf("redirect=");
    const code = location.substring(indexOfCode, indexOfLocation - 1);
    let lineToken;
    try {
      const {
        data: { idToken, expireIn }
      } = await Axios.post("/auth/lineToken", { code });
      lineToken = idToken;
      setTokenAndExpiration(idToken, expireIn);
    } catch (error) {
      console.log(error.response.status);
    }
    try {
      const res = await Axios.post("/auth/myToken/line", {
        lineToken
      });
      if (res.data) {
        setAuthentication(true);
        localStorage.setItem("token", res.data.token);
        Axios.defaults.headers.common["Authorization"] =
          "Bearer " + res.data.token;
        history.push("/" + initialURL);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  render() {
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
}

const mapStateToProps = state => ({
  initialURL: state.liff.initialURL
});

export default connect(
  mapStateToProps,
  { setTokenAndExpiration }
)(LineLanding);

const initAxiosLineErrorHandling = history => {
  Axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response.status === 400) {
        history.push("/auth/registration");
      }
      return error;
    }
  );
};
