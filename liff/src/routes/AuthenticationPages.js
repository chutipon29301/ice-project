import React from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "../auth";
import Registration from "../pages/registration";
import LineLanding from "../pages/line_landing";

const AuthenticationPages = () => (
  <Switch>
    <Route exact path="/auth/registration" component={Registration} />
    <Route exact path="/auth/line-landing" component={LineLanding} />
    <Route exact path="/auth" component={Auth} />
  </Switch>
);

export default AuthenticationPages;
