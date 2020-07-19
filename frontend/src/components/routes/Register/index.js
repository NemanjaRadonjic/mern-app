import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import useFormHook from "@hooks/useFormHook";

import axios from "@axios";

import { Link } from "react-router-dom";

import { Form, Header, Input, Button, Message } from "@styles/common";

function Register() {
  let history = useHistory();

  const [didRegister, setDidRegister] = useState(false);

  const { inputs, onChange } = useFormHook({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/auth/register", inputs);
      if (response.data.success) {
        setDidRegister(true);
        history.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (didRegister) {
    return <div>Don't you have an account ?</div>;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Header>Register</Header>
      <Input
        type="text"
        placeholder="Username"
        name="username"
        value={inputs.username}
        onChange={onChange}
        onBlur={() => console.log("blurred")}
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
