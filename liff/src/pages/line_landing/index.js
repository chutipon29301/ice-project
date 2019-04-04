import React from "react";
import Axios from "axios";
import { setTokenAndExpiration, setAuthentication } from "../../auth/ducks";
import { connect } from "react-redux";

class LineLanding extends React.Component {
  async componentDidMount() {
    const { history, setTokenAndExpiration } = this.props;
    initAxiosLineErrorHandling(history);
    const location = window.location.href;
    const indexOfEqual = location.indexOf("=");
    const code = location.substring(indexOfEqual + 1);
    const {
      data: { idToken, expireIn }
    } = await Axios.post("/auth/lineToken", { code });
    setTokenAndExpiration(idToken, expireIn);
    try {
      console.log("I am trying to authen me self from line-landing");
      const res = await Axios.post("/auth/myToken/line", {
        lineToken: idToken
      });
      if (res.data) {
        setAuthentication(true);
        history.push("/");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  render() {
    return <p>Loading....</p>;
  }
}

export default connect(
  null,
  { setTokenAndExpiration }
)(LineLanding);

const initAxiosLineErrorHandling = history => {
  Axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      console.log("I AM NOT REGISTERED!");
      if (error.response.status === 401) {
        history.push("/auth/registration");
      }
      return error;
    }
  );
};
