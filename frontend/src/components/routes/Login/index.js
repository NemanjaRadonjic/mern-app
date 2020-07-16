import React from "react";

import useFormHook from "@hooks/useFormHook";

import axios from "@axios";

import { Link } from "react-router-dom";

import { Form, Header, Input, Button, Message } from "@styles/common";

function Login() {
  const { inputs, onChange } = useFormHook({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/auth/login", inputs);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
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
