import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Container,
  DropdownConnector,
  DropdownConnectorShadow,
  Group,
  Item,
} from "./styles";

const Dropdown = ({ user, toggleDropdown, handleLogout }) => {
  const handleClick = (event) => {
    if (
      event.target.parentElement.id === "dropdown" ||
      event.target.parentElement.parentElement.id === "dropdown" ||
      event.target.id === "open-dropdown"
    ) {
    } else {
      toggleDropdown();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <Container id="dropdown">
      <DropdownConnectorShadow>
        <DropdownConnector />
      </DropdownConnectorShadow>
      <Item>
        <Link to={`/user/${user.username}`} onClick={toggleDropdown}>
          Profile
        </Link>
      </Item>
      <Group>Account Settings</Group>
      <Item>
        <Link onClick={toggleDropdown} to="/profile/settings/email">
          Change Your Email
        </Link>
      </Item>
      <Item>
        <Link onClick={toggleDropdown} to="/profile/settings/password">
          Change Your Password
        </Link>
      </Item>
      <Group>Profile Settings</Group>
      <Item>
        <Link to="/profile/edit/background" onClick={toggleDropdown}>
          Change Background
        </Link>
      </Item>
      <Item>
        <Link to="/profile/edit/avatar" onClick={toggleDropdown}>
          Change Avatar
        </Link>
      </Item>
      <Item onClick={handleLogout}>
        <Link onClick={toggleDropdown}>Log out</Link>
      </Item>
    </Container>
  );
};

export default Dropdown;
