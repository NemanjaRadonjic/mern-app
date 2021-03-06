import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Container,
  DropdownConnector,
  DropdownConnectorShadow,
  Group,
  Item,
} from "./styles";

const Dropdown = ({ username, toggleDropdown, toggleModal, handleLogout }) => {
  useEffect(() => {
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

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [toggleDropdown]);

  return (
    <>
      <Container id="dropdown">
        <DropdownConnectorShadow>
          <DropdownConnector />
        </DropdownConnectorShadow>
        <Item>
          <Link to={`/user/${username}`} onClick={toggleDropdown}>
            Profile
          </Link>
        </Item>
        <Group>Account Settings</Group>
        <Item>
          <Link
            onClick={toggleDropdown}
            to={`/user/${username}/settings/username`}
          >
            Change Your Username
          </Link>
        </Item>
        <Item>
          <Link
            onClick={toggleDropdown}
            to={`/user/${username}/settings/email`}
          >
            Change Your Email
          </Link>
        </Item>
        <Item>
          <Link
            onClick={toggleDropdown}
            to={`/user/${username}/settings/password`}
          >
            Change Your Password
          </Link>
        </Item>
        <Item>
          <Link
            onClick={() => {
              toggleDropdown();
              toggleModal();
            }}
            to=""
          >
            Delete Account
          </Link>
        </Item>
        <Group>Profile Settings</Group>
        <Item>
          <Link
            to={`/user/${username}/settings/background`}
            onClick={toggleDropdown}
          >
            Change Background
          </Link>
        </Item>
        <Item>
          <Link
            to={`/user/${username}/settings/avatar`}
            onClick={toggleDropdown}
          >
            Change Avatar
          </Link>
        </Item>
        <Item onClick={handleLogout}>
          <Link to="/home" onClick={toggleDropdown}>
            Log out
          </Link>
        </Item>
      </Container>
    </>
  );
};

export default Dropdown;
