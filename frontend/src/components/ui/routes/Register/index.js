import React from "react";
import { Link } from "react-router-dom";

import useFormHook from "@hooks/useFormHook";
import { validateRegister } from "@helpers/validations/register";
import axios from "@axios";

import {
  FormContainer,
  Form,
  Header,
  Input,
  Button,
  Message,
  Error,
} from "@styles/common";

function Register({ history }) {
  const { inputs, onChange, errors, setErrors } = useFormHook({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const validateBackend = async (fieldName) => {
    try {
      const response = await axios.post("/auth/register/validate", {
        ...inputs,
        fieldName,
      });
      setErrors((prevState) => {
        const { field, message } = response.data;
        return {
          ...prevState,
          [field]: message,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    event.persist();
    onChange(event);
    setErrors((prevErrors) => {
      const { name, value } = event.target;
      return {
        ...prevErrors,
        [name]: validateRegister[name](value),
      };
    });
  };

  const comparePasswords = (event, compareTo) => {
    event.persist();
    setErrors((prevErrors) => {
      const { value } = event.target;
      return {
        ...prevErrors,
        repeatPassword: validateRegister.comparePasswords(value, compareTo),
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validateFields = {
      username: validateRegister.username(inputs.username) || errors.username,
      email: validateRegister.email(inputs.email) || errors.email,
      password: validateRegister.password(inputs.password) || errors.password,
      repeatPassword:
        validateRegister.repeatPassword(
          inputs.repeatPassword,
          inputs.password
        ) || errors.repeatPassword,
    };

    const newErrors = validateRegister.setDefaultErrors(inputs, validateFields);
    setErrors(newErrors);

    const finalErrors = new Array(Object.values(newErrors))[0];

    if (finalErrors.every((error) => error.length === 0)) {
      try {
        await axios.post("/auth/register", inputs);
        history.push("/login");
      } catch (error) {
        if (error.response.status === 422) {
          const { field, message } = error.response.data;
          setErrors({ ...errors, [field]: message });
        }
      }
    }
  };

  return (
    <FormContainer>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Header>Register</Header>

        <Input
          type="text"
          placeholder="Username"
          name="username"
          value={inputs.username}
          onChange={handleChange}
          onBlur={(event) => validateBackend(event.target.name)}
        />
        <Error>{errors.username}</Error>
        <Input
          type="text"
          placeholder="Email"
          name="email"
          value={inputs.email}
          onChange={handleChange}
          onBlur={(event) => validateBackend(event.target.name)}
        />
        <Error>{errors.email}</Error>
        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={inputs.password}
          onChange={(event) => {
            handleChange(event);
            comparePasswords(event, inputs.repeatPassword);
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
            comparePasswords(event, inputs.password);
          }}
        />
        <Error>{errors.repeatPassword}</Error>
        <Message>
          <Link to="/login">Already have an account? Click here to Login!</Link>
        </Message>
        <Button>Register</Button>
      </Form>
    </FormContainer>
  );
}

export default Register;