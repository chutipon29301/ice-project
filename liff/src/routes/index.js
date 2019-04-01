import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import OpenLocker from "pages/open";
import OpenLockerRedirect from "pages/open/Redirect";
import Lockers from "pages/lockers";
import MyLocker from "pages/mylocker";
import Auth from "../auth/index";
import LineLanding from "../pages/line_landing";
import Registration from "../pages/registration";
// import MockLocker from "pages/mock-locker";

const MainRouter = () => (
  <div>
    <Router>
      <Switch>
        <Route exact path="/my-locker" component={MyLocker} />
        {/* <Route exact path="/test-locker" component={MockLocker} /> */}
        <Route exact path="/open-locker" component={OpenLocker} />
        <Route exact path="/registration" component={Registration} />
        <Route
          exact
          path="/open-locker-redirect"
          component={OpenLockerRedirect}
        />
        <Route exact path="/find-lockers" component={Lockers} />
        <Route exact path="/line-landing" component={LineLanding} />
        <Route exact path="/" component={Auth} />
      </Switch>
    </Router>
  </div>
);

export default MainRouter;
