import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Container,
  DropdownConnector,
  DropdownConnectorShadow,
  Group,
  Item,
} from "./styles";

const Dropdown = ({ toggleDropdown, handleLogout }) => {
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
      <Link to="/profile" onClick={toggleDropdown}>
        <Item>Profile</Item>
      </Link>
      <Group>Account Settings</Group>
      <Link onClick={toggleDropdown} to="/profile/settings/email">
        <Item>Change Your Email</Item>
      </Link>
      <Link onClick={toggleDropdown} to="/profile/settings/password">
        <Item>Change Your Password</Item>
      </Link>

      <Group>Profile Settings</Group>
      <Link to="/profile/edit/background" onClick={toggleDropdown}>
        <Item>Change Background</Item>
      </Link>
      <Link to="/profile/edit/avatar" onClick={toggleDropdown}>
        <Item>Change Avatar</Item>
      </Link>
      <Link onClick={toggleDropdown}>
        <Item onClick={handleLogout}>Log out</Item>
      </Link>
    </Container>
  );
};

export default Dropdown;
