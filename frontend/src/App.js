import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import axios from "@axios";

import Searchbar from "@components/ui/Searchbar";
import Authbar from "@components/ui/Authbar";

import Register from "@routes/Register";
import Login from "@routes/Login";
import Home from "@routes/Home";
import Post from "@routes/Post";
import NotFound from "@routes/NotFound";

import ProtectedRoute from "@routes/ProtectedRoute";

import { connect } from "react-redux";
import { login } from "@actions/userActions";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { MainContainer, RoutesContainer } from "./styles";

function App({ login }) {
  const user = JSON.parse(window.localStorage.getItem("user"));

  useEffect(() => {
    // const fetchUser = async () => {
    //   if (user) {
    //     try {
    //       await axios.get(`/user/${user.id}`);
    //       login(user);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    // };
    // fetchUser();
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

          <Route default component={NotFound} />
        </Switch>
      </RoutesContainer>
      <Authbar />
      <ToastContainer position="top-center" />
    </MainContainer>
  );
}

export default connect(null, { login })(App);
