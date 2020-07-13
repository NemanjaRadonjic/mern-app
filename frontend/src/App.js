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
      <Routes>
        <Router>
          <Redirect from="/" to="/home" noThrow />
          <Home path="home" />
          <Register path="/register" />
          <Login path="/login" />
          <NotFound default />
        </Router>
      </Routes>
      <Authbar />
    </MainContainer>
  );
}

export default App;
