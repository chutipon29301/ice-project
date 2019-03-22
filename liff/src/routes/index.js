import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Open from "pages/open";
import OpenRedirect from "pages/open/Redirect";
import Lockers from "pages/lockers";
import MyLocker from "pages/mylocker";
import MockLocker from "pages/mock-locker";

const MainRouter = () => (
  <div>
    <Router>
      <Switch>
        <Route exact path="/my-locker" component={MyLocker} />
        <Route exact path="/test-locker" component={MockLocker} />
        <Route exact path="/open-locker" component={Open} />
        <Route exact path="/open-locker-redirect" component={OpenRedirect} />
        <Route exact path="/" component={Lockers} />
      </Switch>
    </Router>
  </div>
);

export default MainRouter;
