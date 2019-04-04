import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const UnAuthenticateRoute = ({
  component: Component,
  isAuthenticate,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (!isAuthenticate) {
        return <Component {...props} />;
      } else {
        return <Redirect to="/" />;
      }
    }}
  />
);

const mapStateToProps = state => ({
  isAuthenticate: state.authentication.isAuthenticate
});

export default connect(mapStateToProps)(UnAuthenticateRoute);
