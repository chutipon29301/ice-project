import React from "react";
import { connect } from "react-redux";
import {
  setAuthentication,
  deleteTokenAndExpiration,
  setTokenAndExpiration
} from "../auth/ducks";
import Axios from "axios";
class Auth extends React.Component {
  async componentDidMount() {
    const { setAuthentication, setTokenAndExpiration } = this.props;
    initAxiosErrorHandling(deleteTokenAndExpiration);
    const idToken = localStorage.getItem("idToken");
    const expireIn = localStorage.getItem("expireIn");
    if (idToken) {
      try {
        const res = await Axios.post("/auth/myToken/line", {
          lineToken: idToken
        });
        if (res) {
          localStorage.setItem("token", res.data.token);
          setAuthentication(true);
          setTokenAndExpiration(idToken, expireIn);
          Axios.defaults.headers.common["Authorization"] =
            "Bearer " + res.data.token;
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    } else {
      window.location.href = "https://10e2f066.ngrok.io/auth/lineLoginPage";
    }
  }
  render() {
    return <h1> Loading...</h1>;
  }
}

const mapStateToProps = state => ({
  isAuthenticate: state.authentication.isAuthenticate,
  idToken: state.authentication.idToken
});

const mapDispatchToProps = {
  setAuthentication,
  setTokenAndExpiration
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);

const initAxiosErrorHandling = callback => {
  Axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response.status === 401) {
        console.log("eiei");
        callback();
        window.location.href = "https://10e2f066.ngrok.io/auth/lineLoginPage";
      }
      return error;
    }
  );
};
