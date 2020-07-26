import React from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Layout from "../../components/layout";
import MovieList from "./movie-list";

const Dashboard = ({ match }) => {
  console.log("Route", match);
  return (
    <Layout>
      <Switch>
        <Route path={match.url} component={MovieList} />
      </Switch>
    </Layout>
  );
};

export default Dashboard;
