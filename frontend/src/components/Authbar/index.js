import React from "react";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { logout } from "@actions/userActions";

import {
  Container,
  AuthContainer,
  Name,
  Settings,
  Avatar,
  LinkContainer,
} from "./styles";

function Authbar({ user, logout }) {
  return (
    <Container>
      <AuthContainer>
        {user ? (
          <>
            <Name>{user.username}</Name>
            <button onClick={logout}>Log out</button>
            <Settings className="fas fa-cog" />
            <Avatar className="fas fa-user-tie" />
          </>
        ) : (
          <>
            <LinkContainer>
              <Link to="/login">Login</Link>
            </LinkContainer>
            <LinkContainer>
              <Link to="/register">Register</Link>
            </LinkContainer>
          </>
        )}
      </AuthContainer>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, { logout })(Authbar);
