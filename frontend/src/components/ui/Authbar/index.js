import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, connect } from "react-redux";
import { logout } from "@actions/userActions";
import Dropdown from "./Dropdown";
import DeleteAccountModal from "@modals/DeleteAccount";
import {
  Container,
  AuthContainer,
  Name,
  Settings,
  Avatar,
  LinkContainer,
} from "./styles";

function Authbar({ logout }) {
  const user = useSelector((state) => state.user);
  const [dropdown, setDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    logout();
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("accessToken");
  };

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {showModal && (
        <DeleteAccountModal
          toggleModal={toggleModal}
          handleLogout={handleLogout}
        />
      )}
      <Container>
        <AuthContainer>
          {user ? (
            <>
              <Avatar src={user.avatar} />
              <Settings
                className="fas fa-cog"
                onClick={toggleDropdown}
                id="open-dropdown"
              />
              <Name>
                <Link
                  className="text-align__center"
                  to={`/user/${user.username}/posts`}
                >
                  {user.username}
                </Link>
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
        {user && dropdown && (
          <Dropdown
            username={user.username}
            handleLogout={handleLogout}
            toggleDropdown={toggleDropdown}
            toggleModal={toggleModal}
          />
        )}
      </Container>
    </>
  );
}

export default connect(null, { logout })(Authbar);
