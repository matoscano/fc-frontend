import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "../../components/layout";
import MovieList from "./movie-list";
import MovieForm from "./movie-form";
import MovieDetails from "./movie-details";
import ShareholderForm from "./shareholder-form";

const Dashboard = ({ match }) => {
  return (
    <Layout>
      <Switch>
        <Route exact path={match.url} component={MovieList} />
        <Route
          exact
          path={`${match.path}/create-movie`}
          component={MovieForm}
        />
        <Route
          exact
          path={`${match.path}/create-shareholder`}
          component={ShareholderForm}
        />
        <Route
          exact
          path={`${match.path}/create-transfer`}
          component={MovieForm}
        />
        <Route path={`${match.path}/:movieId`} component={MovieDetails} />
      </Switch>
    </Layout>
  );
};

export default Dashboard;
