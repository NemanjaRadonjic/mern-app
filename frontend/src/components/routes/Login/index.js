import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import useFormHook from "@hooks/useFormHook";

import axios from "@axios";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { login } from "@actions/userActions";

import { Form, Header, Input, Button, Message, Error } from "@styles/common";

function Login({ user, login }) {
  let history = useHistory();

  const { inputs, onChange, errors, setErrors, fields } = useFormHook({
    email: "",
    password: "",
  });
  console.log("INPUT: ", inputs);
  console.log("ERROR: ", errors);

  // const [errors, setErrors] = useState({
  //   email: null,
  //   password: null,
  // });

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
      try {
        const response = await axios.post("/auth/login", inputs);
        if (response.status === 200) {
          window.localStorage.setItem(
            "user",
            JSON.stringify(response.data.user)
          );
          login(response.data.user);
          history.push("/");
        }
      } catch (error) {
        const { field, message } = error.response.data;
        setErrors({
          ...errors,
          [field]: message,
        });
      }
    }
  };

  if (user) {
    return <div>You are already logged in!</div>;
  }

  return (
    <Form autoComplete="off" onSubmit={handleSubmit}>
      <Header>Login</Header>
      <Input
        type="email"
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
      <Button>Login</Button>
    </Form>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, { login })(Login);
