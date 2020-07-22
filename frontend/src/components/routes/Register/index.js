import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import useFormHook from "@hooks/useFormHook";

import { validateRegister } from "@validations";

import axios from "@axios";

import { Link } from "react-router-dom";

import { Form, Header, Input, Button, Message, Error } from "@styles/common";

function Register() {
  let history = useHistory();

  const [didRegister, setDidRegister] = useState(false);

  const { inputs, onChange, errors, setErrors } = useFormHook({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleChange = (event, field) => {
    event.persist();
    onChange(event);
    setErrors((prevState) => {
      return {
        ...prevState,
        [event.target.name]: validateRegister[field](event.target.value),
      };
    });
  };
  console.log(errors);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors((prevState) => {
      console.log(prevState);
      return {
        username: validateRegister.username(inputs.username),
        email: validateRegister.email(inputs.email),
        password: validateRegister.password(inputs.password),
        repeatPassword: validateRegister.repeatPassword(inputs.repeatPassword),
      };
    });
    console.log(errors);
    if (
      !errors.username &&
      !errors.email &&
      !errors.password &&
      !errors.repeatPassword
    ) {
      try {
        const response = await axios.post("/auth/register", inputs);
        if (response.data.success) {
          setDidRegister(true);
          history.push("/login");
        }
      } catch (error) {
        const { field, message } = error.response.data;
        setErrors({ ...errors, [field]: message });
      }
    } else {
      console.log("errors");
    }
  };

  if (didRegister) {
    return <div>Don't you have an account ?</div>;
  }

  return (
    <Form autoComplete="off" onSubmit={handleSubmit}>
      <Header>Register</Header>
      <Input
        type="text"
        placeholder="Username"
        name="username"
        value={inputs.username}
        onChange={(event) => {
          handleChange(event, "username");
        }}
      />
      <Error>{errors.username}</Error>
      <Input
        type="email"
        placeholder="Email"
        name="email"
        value={inputs.email}
        onChange={(event) => {
          handleChange(event, "email");
        }}
      />
      <Error>{errors.email}</Error>
      <Input
        type="password"
        placeholder="Password"
        name="password"
        value={inputs.password}
        onChange={(event) => {
          handleChange(event, "password");
        }}
      />
      <Error>{errors.password}</Error>
      <Input
        type="password"
        placeholder="Repeat password"
        name="repeatPassword"
        value={inputs.repeatPassword}
        onChange={onChange}
      />
      <Error>{errors.repeatPassword}</Error>
      <Message>
        <Link to="/login">Already have an account? Click here to Login!</Link>
      </Message>
      <Button>Register</Button>
    </Form>
  );
}

export default Register;
