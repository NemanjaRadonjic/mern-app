import React from "react";
import { Link } from "react-router-dom";
import { useSelector, connect } from "react-redux";
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

function Authbar({ logout }) {
  const user = useSelector((state) => state.user);
  const handleLogout = () => {
    logout();
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("accessToken");
  };

  return (
    <Container>
      <AuthContainer>
        {user ? (
          <>
            <Avatar src="https://www.nlg.nhs.uk/content/uploads/2016/04/man.jpg" />
            <Settings className="fas fa-cog" />
            <Name>{user.username}</Name>
            <Button onClick={handleLogout}>Log out</Button>
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

export default connect(null, { logout })(Authbar);
