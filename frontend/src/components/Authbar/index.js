import React from "react";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import {
  Container,
  AuthContainer,
  Name,
  Settings,
  Avatar,
  LinkContainer,
} from "./styles";

function Authbar({ user }) {
  return (
    <Container>
      <AuthContainer>
        {user ? (
          <>
            <Name>{user.username}</Name>
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

export default connect(mapStateToProps)(Authbar);
