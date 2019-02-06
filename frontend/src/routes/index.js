import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Deposit from "../pages/deposit";


const MainRouter = () => (
  <div>
    <h1> eiei </h1>
    <Router>
      <Switch>
        <Route exact path="/" component={Deposit} />
      </Switch>
    </Router>
  </div>
);

export default MainRouter;