import React from "react";

import { Router, Redirect } from "@reach/router";

import Searchbar from "./components/Searchbar";
import Authbar from "./components/Authbar";
import Routes from "./components/Routes";

import Register from "./routes/Register";
import Login from "./routes/Login";

import Home from "./routes/Home";

import NotFound from "./routes/NotFound";

import { MainContainer } from "./styles";

function App() {
  return (
    <MainContainer>
      <Searchbar />
      <Router component={Routes}>
        <Redirect from="/" to="/home" noThrow />
        <Home path="home" />
        <Register exact path="/register" />
        <Login exact path="/login" />
        <NotFound default />
      </Router>
      <Authbar />
    </MainContainer>
  );
}

export default App;
