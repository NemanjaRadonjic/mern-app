import React from "react";

import useFormHook from "../../../hooks/useFormHook";

import { Link } from "react-router-dom";

import { Form, Header, Input, Button, Message } from "../../../styles/common";

function Register() {
  const { inputs, onChange } = useFormHook({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  return (
    <Form>
      <Header>Register</Header>
      <Input
        type="text"
        placeholder="Username"
        name="username"
        value={inputs.username}
        onChange={onChange}
      />
      <Input
        type="email"
        placeholder="Email"
        name="email"
        value={inputs.email}
        onChange={onChange}
      />
      <Input
        type="password"
        placeholder="Password"
        name="password"
        value={inputs.password}
        onChange={onChange}
      />
      <Input
        type="password"
        placeholder="Repeat password"
        name="repeatPassword"
        value={inputs.repeatPassword}
        onChange={onChange}
      />
      <Message>
        <Link to="/login">Already have an account? Click here to Login!</Link>
      </Message>
      <Button>Register</Button>
    </Form>
  );
}

export default Register;
