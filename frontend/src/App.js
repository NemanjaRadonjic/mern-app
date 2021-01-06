import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, Link } from "react-router-dom";
import axiosInstance from "@axios";

import Searchbar from "@components/ui/Searchbar";
import Authbar from "@components/ui/Authbar";

import Register from "@routes/Register";
import Login from "@routes/Login";
import Home from "@routes/Home";
import Post from "@routes/Post";
import Profile from "@routes/Profile";
import NotFound from "@routes/NotFound";

import ProtectedRoute from "@routes/ProtectedRoute";

import { connect } from "react-redux";
import { login } from "@actions/userActions";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MainContainer, RoutesContainer, BackToHome } from "./styles";

import { GlobalStyle } from "@styles/globalStyle";

import { ThemeProvider } from "styled-components";
import { light, dark } from "./styles/themes";

function App({ login }) {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const [theme, setTheme] = useState(light);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response =
          user && (await axiosInstance.get(`/users/${user.username}`));
        response.data && login(user);
      } catch (error) {
        window.localStorage.removeItem("user");
      }
    };
    fetchUser();
  });

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <MainContainer>
        <Searchbar theme={theme} setTheme={setTheme} themes={{ light, dark }} />
        <RoutesContainer>
          <BackToHome>
            <Link className="text-align__center" to="/home">
              Home
            </Link>
          </BackToHome>
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
              redirectMsg="You already have an account"
            />
            <ProtectedRoute
              exact
              path="/login"
              component={Login}
              redirectTo="/home"
              redirectMsg="You are already logged in"
            />
            <Route exact path="/posts/:postId" component={Post} />
            <ProtectedRoute
              path="/user/:username"
              component={Profile}
              redirectTo="/home"
              redirectMsg="You have to log in to see that page"
              userPrivilege
            />

            <Route default component={NotFound} />
          </Switch>
        </RoutesContainer>
        <Authbar />
        <ToastContainer position="bottom-right" />
      </MainContainer>
    </ThemeProvider>
  );
}

export default connect(null, { login })(App);
