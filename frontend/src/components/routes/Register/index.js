import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import useFormHook from "@hooks/useFormHook";

import axios from "@axios";

import { Link } from "react-router-dom";

import { Form, Header, Input, Button, Message, Error } from "@styles/common";

function Register() {
  let history = useHistory();

  const [didRegister, setDidRegister] = useState(false);

  const { inputs, onChange, errors, setErrors, validate } = useFormHook({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  React.useEffect(() => {}, [errors]);

  const handleChange = (event) => {
    onChange(event);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (false) {
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
      setErrors(validate.all());
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
          handleChange(event);
          setErrors((prevState) => {
            return { ...prevState, username: validate.username().errors };
          });
        }}
      />
      <Error>{errors.username}</Error>
      <Input
        type="email"
        placeholder="Email"
        name="email"
        value={inputs.email}
        onChange={(event) => {
          handleChange(event);
          setErrors({ ...errors, email: validate.email().errors });
        }}
      />
      <Error>{errors.email}</Error>
      <Input
        type="password"
        placeholder="Password"
        name="password"
        value={inputs.password}
        onChange={(event) => {
          handleChange(event);
          setErrors({ ...errors, password: validate.password().errors });
        }}
      />
      <Error>{errors.password}</Error>
      <Input
        type="password"
        placeholder="Repeat password"
        name="repeatPassword"
        value={inputs.repeatPassword}
        onChange={(event) => {
          handleChange(event);
          setErrors({
            ...errors,
            repeatPassword: validate.repeatPassword().errors,
          });
        }}
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
