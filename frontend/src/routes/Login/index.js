import React from "react";

import useFormHook from "../../hooks/useFormHook";

import { Link } from "@reach/router";

import { Form, Header, Input, Button, Message } from "../../styles/common";

function Login() {
  const { inputs, setInputs } = useFormHook({
    email: "",
    password: "",
  });
  console.log(inputs);
  return (
    <Form>
      <Header>Login</Header>
      <Input
        type="email"
        placeholder="Email"
        name="email"
        value={inputs.email}
        onChange={(event) =>
          setInputs({ ...inputs, [event.target.name]: event.target.value })
        }
      />
      <Input
        type="password"
        placeholder="Password"
        name="password"
        value={inputs.password}
        onChange={(event) =>
          setInputs({ ...inputs, [event.target.name]: event.target.value })
        }
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
