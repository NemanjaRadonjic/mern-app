import React from "react";

import useFormHook from "../../../hooks/useFormHook";

import { Link } from "react-router-dom";

import { Form, Header, Input, Button, Message } from "../../../styles/common";

function Login() {
  const { inputs, onChange } = useFormHook({
    email: "",
    password: "",
  });
  return (
    <Form>
      <Header>Login</Header>
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
      <Message>
        <Link to="/register">
          Don't have an account? Click here to Register!
        </Link>
      </Message>
      <Button>Login</Button>
    </Form>
  );
}

export default Login;
