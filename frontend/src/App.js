import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Searchbar from "@components/Searchbar";
import Authbar from "@components/Authbar";

import Register from "@routes/Register";
import Login from "@routes/Login";
import Home from "@routes/Home";
import NotFound from "@routes/NotFound";

import ProtectedRoute from "@routes/ProtectedRoute";

import { connect } from "react-redux";
import { login } from "@actions/userActions";

import { MainContainer, RoutesContainer } from "./styles";

function App({ login }) {
  const user = JSON.parse(window.localStorage.getItem("user"));
  useEffect(() => {
    login(user);
  });
  return (
    <MainContainer>
      <Searchbar />
      <RoutesContainer>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/home" component={Home} />
          <ProtectedRoute
            exact
            path="/register"
            component={Register}
            redirectTo="/home"
          />
          <ProtectedRoute
            exact
            path="/login"
            component={Login}
            redirectTo="/home"
          />

          <Route default component={NotFound} />
        </Switch>
      </RoutesContainer>
      <Authbar />
    </MainContainer>
  );
}

export default connect(null, { login })(App);
