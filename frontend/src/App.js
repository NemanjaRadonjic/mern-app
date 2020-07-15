import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";

import Searchbar from "@components/Searchbar";
import Authbar from "@components/Authbar";

import Register from "@routes/Register";
import Login from "@routes/Login";

import Home from "@routes/Home";

import NotFound from "@routes/NotFound";

import { MainContainer, RoutesContainer } from "./styles";

function App() {
  return (
    <MainContainer>
      <Searchbar />
      <RoutesContainer>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/home" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route default component={NotFound} />
        </Switch>
      </RoutesContainer>
      <Authbar />
    </MainContainer>
  );
}

export default App;
