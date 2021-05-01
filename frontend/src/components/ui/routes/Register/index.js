import React from "react";
import { Link } from "react-router-dom";

import useFormHook from "@hooks/useFormHook";
import validateInputs from "@helpers/validations";
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
        [name]: validateInputs[name](value),
      };
    });
  };

  const comparePasswords = (event, compareTo) => {
    event.persist();
    setErrors((prevErrors) => {
      const { value } = event.target;
      return {
        ...prevErrors,
        repeatPassword: validateInputs.comparePasswords(value, compareTo),
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validateFields = {
      username: validateInputs.username(inputs.username) || errors.username,
      email: validateInputs.email(inputs.email) || errors.email,
      password: validateInputs.password(inputs.password) || errors.password,
      repeatPassword:
        validateInputs.repeatPassword(inputs.repeatPassword, inputs.password) ||
        errors.repeatPassword,
    };

    const newErrors = validateInputs.setDefaultErrors(inputs, validateFields);
    setErrors(newErrors);

    const finalErrors = new Array(Object.values(newErrors))[0];

    if (finalErrors.every((error) => error.length === 0)) {
      try {
        await axios.post("/auth/register", inputs);
        history.push("/login");
      } catch (error) {
        if (error.response?.status === 422) {
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
          error={errors.username.length > 0}
          type="text"
          placeholder="Username"
          name="username"
          value={inputs.username}
          onChange={handleChange}
          onBlur={(event) => validateBackend(event.target.name)}
        />
        <Error>{errors.username}</Error>
        <Input
          error={errors.email.length > 0}
          type="text"
          placeholder="Email"
          name="email"
          value={inputs.email}
          onChange={handleChange}
          onBlur={(event) => validateBackend(event.target.name)}
        />
        <Error>{errors.email}</Error>
        <Input
          error={errors.password.length > 0}
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
          error={errors.repeatPassword.length > 0}
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
          <Link className="text-align__center" to="/login">
            Already have an account? Click here to Login!
          </Link>
        </Message>
        <Button className="align-center">Register</Button>
      </Form>
    </FormContainer>
  );
}

export default Register;
