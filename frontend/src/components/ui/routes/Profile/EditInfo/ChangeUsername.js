import React from "react";
import axiosInstance from "@axios";
import { useSelector } from "react-redux";
import useFormHook from "@hooks/useFormHook";
import validateInputs from "@helpers/validations";

import store from "@store";
import { changeUsername } from "@actions/userActions";

import {
  FormContainer,
  Form,
  Header,
  Input,
  Button,
  Error,
} from "@styles/common";
import { toast } from "react-toastify";

const ChangeUsername = ({ history }) => {
  const username = useSelector((state) => state.user?.username);

  const { inputs, onChange, errors, setErrors, fields } = useFormHook({
    username: "",
  });

  const handleChange = (event) => {
    event.persist();
    onChange(event);
    setErrors(fields);
    setErrors((prevErrors) => {
      const { name, value } = event.target;
      return { ...prevErrors, [name]: validateInputs[name](value) };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputs.username.length === 0) {
      setErrors({ ...errors, username: "Please enter your new username." });
    } else if (inputs.username === username) {
      setErrors({ ...errors, username: "That is your current username." });
    } else {
      const { data } = await axiosInstance.patch(
        `/users/${username}/settings/username`,
        {
          username,
          newUsername: inputs.username,
        }
      );
      const userData = JSON.parse(window.localStorage.getItem("user"));
      userData.username = data.username;
      window.localStorage.setItem("user", JSON.stringify(userData));
      store.dispatch(changeUsername(data.username));
      history.push(`/user/${data.username}`);
      toast("Your username has been changed.");
    }
  };

  return (
    <FormContainer smaller>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Header>Change your username</Header>
        <Input
          type="text"
          placeholder="New Username"
          name="username"
          value={inputs.username}
          onChange={handleChange}
        />
        <Error>{errors.username}</Error>
        <Button className="align-center">Confirm</Button>
      </Form>
    </FormContainer>
  );
};

export default ChangeUsername;
