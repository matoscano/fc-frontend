import React from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";
import Layout from "../../components/layout";

const Dashboard = ({ match }) => {
  return (
    <Layout>
      <Route
        exact
        path={match.url}
        render={() => <div>Please select a product.</div>}
      />
    </Layout>
  );
};

export default Dashboard;
