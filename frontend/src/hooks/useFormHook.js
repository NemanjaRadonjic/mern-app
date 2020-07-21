import { useState } from "react";

const useFormHook = (fields) => {
  const [inputs, setInputs] = useState({ ...fields });

  const [errors, setErrors] = useState({ ...fields });

  const validate = {
    username: () => {
      let errors = "";
      let isValid = false;
      if (inputs.username.length === 0) {
        errors = "Please enter your Username.";
      } else if (inputs.username.length < 4) {
        errors = "Username has to be more than 4 characters long.";
      } else if (inputs.username.length > 12) {
        errors = "Username has to be less than 12 characters long.";
      } else {
        errors = "";
        isValid = true;
      }
      return { errors, isValid };
    },

    email: () => {
      let errors = "";
      let isValid = false;

      if (inputs.email.length === 0) {
        errors = "Please enter your Email.";
      } else {
        errors = "";
        isValid = true;
      }
      return { errors, isValid: true };
    },

    password: () => {
      let errors = "";
      let isValid = false;
      if (inputs.password.length === 0) {
        errors = "Please enter your Password.";
      } else if (inputs.password.length < 8) {
        errors = "Password has to be more than 8 characters long.";
      } else if (inputs.password.length > 30) {
        errors = "Password has to be less than 30 characters long.";
      } else {
        errors = "";
        isValid = true;
      }
      return { errors, isValid: true };
    },
    repeatPassword: () => {
      let errors = "";
      let isValid = false;
      if (inputs.password !== inputs.repeatPassword) {
        errors = "Passwords don't match.";
      } else {
        errors = "";
        isValid = true;
      }
      return { errors, isValid: true };
    },
    all: () => {
      validate.username();
      validate.email();
      validate.password();
      validate.repeatPassword();

      return {
        username: validate.username().errors,
        email: validate.email().errors,
        password: validate.password().errors,
        repeatPassword: validate.repeatPassword().errors,
      };
    },
  };

  const onChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  return { inputs, onChange, setInputs, errors, setErrors, fields, validate };
};

export default useFormHook;
