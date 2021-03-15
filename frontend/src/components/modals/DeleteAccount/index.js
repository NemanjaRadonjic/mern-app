import React from "react";
import { useSelector } from "react-redux";
import { createPortal } from "react-dom";
import axiosInstance from "@axios";

import { BackgroundContainer, Container, Message } from "./styles";
import { Button } from "@styles/common";

const DeleteAccountModal = ({ toggleModal, handleLogout }) => {
  const user = useSelector((state) => state.user);
  const deleteAccount = async () => {
    await axiosInstance.delete(`users/${user.username}/delete`);
  };
  const handleDelete = () => {
    deleteAccount();
    handleLogout();
  };
  return createPortal(
    <BackgroundContainer onClick={toggleModal}>
      <Container>
        <Message danger>This action is irreversible!</Message>
        <Message>Are you sure you want to delete your account?</Message>
        <Button style={{ width: "auto" }} onClick={handleDelete}>
          I want do delete my account
        </Button>
        <Button>Cancel</Button>
      </Container>
    </BackgroundContainer>,
    document.getElementById("portal")
  );
};

export default DeleteAccountModal;
