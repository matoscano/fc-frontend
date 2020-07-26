import React from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Layout from "../../components/layout";
import MovieList from "./movie-list";
import MovieForm from "./movie-form";
import { useMutation } from "@apollo/client";
import { CREATE_MOVIE } from "../../api/mutations";

const Dashboard = ({ match }) => {
  return (
    <Layout>
      <Switch>
        <Route exact path={match.url} component={MovieList} />
        <Route path={`${match.path}/create-movie`} component={MovieForm} />
      </Switch>
    </Layout>
  );
};

export default Dashboard;
