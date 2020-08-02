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
  Button,
  LinkContainer,
} from "./styles";

function Authbar({ user, logout }) {
  const handleLogout = () => {
    logout();
    window.localStorage.removeItem("user");
  };

  return (
    <Container>
      <AuthContainer>
        {user ? (
          <>
            <Button onClick={handleLogout}>Log out</Button>
            <Name>{user.username}</Name>
            <Settings className="fas fa-cog" />
            <Avatar src="https://www.nlg.nhs.uk/content/uploads/2016/04/man.jpg" />
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
