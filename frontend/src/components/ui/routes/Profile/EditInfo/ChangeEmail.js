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

const ChangeEmail = ({ history }) => {
  const username = useSelector((state) => state.user?.username);
  const email = useSelector((state) => state.user?.email);

  const { inputs, onChange, errors, setErrors, fields } = useFormHook({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    event.persist();
    onChange(event);
    setErrors(fields);
    if (event.target.name === "email") {
      setErrors((prevErrors) => {
        const { name, value } = event.target;
        return { ...prevErrors, [name]: validateInputs[name](value) };
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputs.email.length === 0) {
      setErrors({ ...errors, email: "Please enter your new username." });
    } else if (inputs.email === email) {
      setErrors({ ...errors, email: "That is your current email." });
    } else if (inputs.password.length === 0) {
      setErrors({ ...errors, password: "Please enter your password." });
    } else {
      try {
        await axiosInstance.patch(`/users/${username}/settings/email`, {
          username,
          newEmail: inputs.email,
          password: inputs.password,
        });
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
      store.dispatch(logout());
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("accessToken");
      toast("Your email has been changed. Please login with your new email.");
      history.push(`/login`);
    }
  };

  return (
    <FormContainer smaller>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Header>Change your email</Header>
        <Input
          type="text"
          placeholder="New Email"
          name="email"
          value={inputs.email}
          onChange={handleChange}
        />
        <Error>{errors.email}</Error>
        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={inputs.password}
          onChange={handleChange}
        />
        <Error>{errors.password}</Error>
        <Button className="align-center">Confirm</Button>
      </Form>
    </FormContainer>
  );
};

export default ChangeEmail;
