import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import LiffPages from "./PrivatePages";
import UnAuthenticateRoute from "./UnAuthenticateRoute";
import AuthenticationPages from "./AuthenticationPages";

const MainRouter = () => (
  <div>
    <Router>
      <Switch>
        <UnAuthenticateRoute path="/auth" component={AuthenticationPages} />
        <PrivateRoute path="/" component={LiffPages} />
      </Switch>
    </Router>
  </div>
);

export default MainRouter;
