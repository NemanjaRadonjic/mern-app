import React from "react";

import { Link } from "@reach/router";

import { Form, Header, Input, Button, Message } from "../../styles/common";

function Register() {
  return (
    <Form>
      <Header>Register</Header>
      <Input type="email" placeholder="Email" />
      <Input type="text" placeholder="Username" />
      <Input type="password" placeholder="Password" />
      <Input type="password" placeholder="Repeat Password" />
      <Link to="/login">
        <Message>Already have an account? Click here to Login!</Message>
      </Link>
      <Button>Register</Button>
    </Form>
  );
}

export default Register;
