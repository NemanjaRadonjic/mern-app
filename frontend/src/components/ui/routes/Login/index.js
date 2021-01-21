import React from "react";
import { Link } from "react-router-dom";

import useFormHook from "@hooks/useFormHook";
import axiosInstance from "@axios";
import { login } from "@actions/userActions";
import store from "@store";

import {
  FormContainer,
  Form,
  Header,
  Input,
  Error,
  Button,
  Message,
} from "@styles/common";
import jwtDecode from "jwt-decode";

function Login({ history }) {
  const { inputs, onChange, errors, setErrors, fields } = useFormHook({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    onChange(event);
    setErrors({ ...fields });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputs.email.length === 0) {
      setErrors({ ...errors, email: "Please enter your email." });
    } else if (inputs.password.length === 0) {
      setErrors({ ...errors, password: "Please enter your password." });
    } else {
      let userData = {};
      try {
        const response = await axiosInstance.post("/auth/login", inputs);
        const { avatar, background, accessToken } = response.data;
        const { email, id, username } = jwtDecode(accessToken);
        userData = {
          email,
          id,
          username,
          avatar,
          background,
        };
        window.localStorage.setItem("user", JSON.stringify(userData));
        window.localStorage.setItem("accessToken", JSON.stringify(accessToken));
        history.push("/home");
        store.dispatch(login(userData));
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
    <FormContainer>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Header>Login</Header>
        <Input
          type="text"
          placeholder="Email"
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
        <Message>
          <Link to="/register">
            Don't have an account? Click here to Register!
          </Link>
        </Message>
        <Button className="align-center">Login</Button>
      </Form>
    </FormContainer>
  );
}

export default Login;
