import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "../../components/layout";
import ShareholderList from "./shareholder-list";
import ShareholderDetails from "./shareholder-details";

const Wallet = ({ match }) => {
  return (
    <Layout>
      <Switch>
        <Route exact path={match.url} component={ShareholderList} />
        <Route
          path={`${match.path}/:shareholderId`}
          component={ShareholderDetails}
        />
      </Switch>
    </Layout>
  );
};

export default Wallet;
