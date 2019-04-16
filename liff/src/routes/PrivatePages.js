import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import MyLocker from "../pages/mylocker";
import OpenLocker from "../pages/open";
import OpenLockerRedirect from "../pages/open/Redirect";
import Lockers from "../pages/lockers";
import ShareLocker from "../pages/share-locker";
import LockerDetails from "../pages/mylocker/LockerDetails";

const PrivatePages = () => (
  <Switch>
    <Route exact path="/open-locker-redirect" component={OpenLockerRedirect} />
    <Route exact path="/share" component={ShareLocker} />
    <Route exact path="/open-locker" component={OpenLocker} />
    <Route exact path="/find-lockers" component={Lockers} />
    <Route exact path="/my-locker/:id" component={LockerDetails} />
    <Route exact path="/my-locker" component={MyLocker} />
    <Route exact path="/" component={RedirectToMyLocker} />
  </Switch>
);

const RedirectToMyLocker = () => <Redirect to="/my-locker" />;

export default PrivatePages;
