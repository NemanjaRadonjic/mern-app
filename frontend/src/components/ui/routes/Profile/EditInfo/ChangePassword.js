import React from "react";
import axiosInstance from "@axios";
import { useSelector } from "react-redux";
import useFormHook from "@hooks/useFormHook";
import validateInputs from "@helpers/validations";

import store from "@store";
import { logout } from "@actions/userActions";

import {
  FormContainer,
  Form,
  Header,
  Input,
  Button,
  Error,
} from "@styles/common";
import { toast } from "react-toastify";

const ChangePassword = ({ history }) => {
  const username = useSelector((state) => state.user?.username);

  const { inputs, onChange, errors, setErrors, fields } = useFormHook({
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (event) => {
    event.persist();
    onChange(event);
    setErrors(fields);
    if (event.target.name === "newPassword") {
      setErrors((prevErrors) => {
        const { name, value } = event.target;
        return { ...prevErrors, newPassword: validateInputs.password(value) };
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputs.currentPassword.length === 0) {
      setErrors({
        ...errors,
        currentPassword: "Please enter your current password.",
      });
    } else if (inputs.newPassword.length === 0) {
      setErrors({ ...errors, newPassword: "Please enter your new password." });
    } else if (errors.currentPassword || errors.newPassword) {
    } else {
      try {
        await axiosInstance.patch(`/users/${username}/settings/password`, {
          username,
          password: inputs.currentPassword,
          newPassword: inputs.newPassword,
        });
        store.dispatch(logout());
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("accessToken");
        toast(
          "Your password has been changed. Please login with your new password."
        );
        history.push(`/login`);
      } catch (error) {
        if (error.response) {
          const { field, message } = error.response.data;
          setErrors({
            ...errors,
            [field]: message,
          });
        } else {
          console.log(error);
        }
      }
    }
  };

  return (
    <FormContainer smaller>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Header>Change your password</Header>
        <Input
          type="password"
          placeholder="Current Password"
          name="currentPassword"
          value={inputs.currentPassword}
          onChange={handleChange}
        />
        <Error>{errors.currentPassword}</Error>
        <Input
          type="password"
          placeholder="New Password"
          name="newPassword"
          value={inputs.newPassword}
          onChange={handleChange}
        />
        <Error>{errors.newPassword}</Error>
        <Button className="align-center">Confirm</Button>
      </Form>
    </FormContainer>
  );
};

export default ChangePassword;
