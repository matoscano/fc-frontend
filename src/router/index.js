import React from "react";
import { Route, Switch } from "react-router-dom";
import Landing from "../pages/landing";
import Dashboard from "../pages/dashboard";
import Wallet from "../pages/wallet";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={Landing} exact />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/wallet/:id" component={Wallet} />
      <Route component={() => <h1>Oops! Page not found!</h1>} />
    </Switch>
  );
};

export default Routes;
