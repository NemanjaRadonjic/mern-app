import React from "react";

import useFormHook from "../../hooks/useFormHook";

import { Link } from "@reach/router";

import { Form, Header, Input, Button, Message } from "../../styles/common";

function Register() {
  const { inputs, setInputs } = useFormHook({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  console.log(inputs);
  return (
    <Form>
      <Header>Register</Header>
      <Input
        type="text"
        placeholder="Username"
        name="username"
        value={inputs.username}
        onChange={(event) =>
          setInputs({ ...inputs, [event.target.name]: event.target.value })
        }
      />
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
      <Input
        type="password"
        placeholder="Repeat password"
        name="repeatPassword"
        value={inputs.repeatPassword}
        onChange={(event) =>
          setInputs({ ...inputs, [event.target.name]: event.target.value })
        }
      />
      <Message>
        <Link to="/login">Already have an account? Click here to Login!</Link>
      </Message>
      <Button>Register</Button>
    </Form>
  );
}

export default Register;
