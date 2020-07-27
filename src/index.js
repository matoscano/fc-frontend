import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./api/index";
import "./assets/styles/app.css";
import Routes from "./router";
import * as serviceWorker from "./serviceWorker";
import { ToastProvider } from "react-toast-notifications";

ReactDOM.render(
  <ApolloProvider client={client}>
    <ToastProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ToastProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
