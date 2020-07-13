import React from "react";

import { Link } from "@reach/router";

import { Form, Header, Input, Button, Message } from "../../styles/common";

function Login() {
  return (
    <Form>
      <Header>Login</Header>
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Link to="/login">
        <Message>Don't have an account? Click here to Register!</Message>
      </Link>
      <Button>Login</Button>
    </Form>
  );
}

export default Login;
