export const validateRegister = {
  username: (username) => {
    let errors = "";
    if (username.length <= 4 && username.length > 0) {
      errors = "Username has to be more than 4 characters long.";
    } else if (username.length > 12) {
      errors = "Username has to be less than 12 characters long.";
    }
    return errors;
  },

  email: (email) => {
    let errors = "";
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.length === 0) {
      errors = "";
    } else if (!re.test(String(email).toLowerCase())) {
      errors = "Please enter a valid email.";
    }
    return errors;
  },

  password: (password) => {
    let errors = "";
    if (password.length < 8 && password.length > 0) {
      errors = "Password has to be more than 8 characters long.";
    } else if (password.length > 30) {
      errors = "Password has to be less than 30 characters long.";
    }
    return errors;
  },

  repeatPassword: (repeatPassword, password) => {
    let errors = "";
    if (repeatPassword.length === 0) {
      errors = "";
    } else if (password.length === 0) {
      errors = "Please enter your password first.";
    } else if (repeatPassword !== password) {
      errors = "Passwords do not match.";
    }
    return errors;
  },

  checkIfEmpty: (inputs, errorFields) => {
    const errors = {
      ...errorFields,
    };
    if (inputs.username.length === 0) {
      errors.username = "Please enter your username.";
    }
    if (inputs.email.length === 0) {
      errors.email = "Please enter your email.";
    }
    if (inputs.password.length === 0) {
      errors.password = "Please enter your password.";
    }
    if (inputs.repeatPassword.length === 0) {
      errors.repeatPassword = "Please repeat your password.";
    }
    return errors;
  },
};
