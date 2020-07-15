import React, { useState } from "react";

import { Link } from "react-router-dom";

import {
  Container,
  AuthContainer,
  Name,
  Settings,
  Avatar,
  LinkContainer,
} from "./styles";

function Authbar() {
  const [isLoggedIn] = useState(false);
  return (
    <Container>
      <AuthContainer>
        {isLoggedIn ? (
          <>
            <Name>Username</Name>
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

export default Authbar;
