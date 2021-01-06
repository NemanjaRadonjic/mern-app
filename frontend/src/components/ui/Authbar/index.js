import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, connect } from "react-redux";
import { logout } from "@actions/userActions";
import getImageSrc from "@helpers/imageSrc";

import {
  Container,
  AuthContainer,
  Name,
  Settings,
  Avatar,
  Button,
  LinkContainer,
} from "./styles";
import Dropdown from "./Dropdown";

function Authbar({ logout }) {
  const user = useSelector((state) => state.user);
  useSelector((state) => state.user?.avatar); // making a component re-render
  const [dropdown, setDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("accessToken");
  };

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <Container>
      <AuthContainer>
        {user ? (
          <>
            <Avatar src={getImageSrc(user.avatar, "avatar")} />
            <Settings
              className="fas fa-cog"
              onClick={toggleDropdown}
              id="open-dropdown"
            />
            <Name>
              <Link to={`/user/${user.username}/posts`}>{user.username}</Link>
            </Name>
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
      {dropdown && (
        <Dropdown
          user={user}
          handleLogout={handleLogout}
          toggleDropdown={toggleDropdown}
        />
      )}
    </Container>
  );
}

export default connect(null, { logout })(Authbar);
