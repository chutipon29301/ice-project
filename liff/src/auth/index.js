import React from "react";
import { connect } from "react-redux";

class Auth extends React.Component {
  async componentDidMount() {
    if (!this.props.isAuthenticate) {
      window.location.href = "http://localhost/auth/lineLoginPage";
    }
  }
  render() {
    return <h1> Loading...</h1>;
  }
}

const mapStateToProps = state => ({
  isAuthenticate: state.authentication.isAuthenticate
});

export default connect(mapStateToProps)(Auth);
