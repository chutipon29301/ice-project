import React from "react";
import Axios from "axios";
import { setTokenAndExpiration } from "../../auth/ducks";
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
      const res = await Axios.post("/auth/myToken/line", {
        lineToken: idToken
      });
    } catch (error) {
      console.log(error);
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
      if (error.response.status === 401) {
        history.push("/registration");
      }
      return error;
    }
  );
};
