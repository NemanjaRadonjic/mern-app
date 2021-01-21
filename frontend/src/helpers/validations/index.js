const validateInputs = {
  username: (username) => {
    let error = "";
    const re = /[^A-Za-z0-9]+/g;
    if (username.length <= 4 && username.length > 0) {
      error = "Username has to be more than 4 characters long.";
    } else if (re.test(username.toLowerCase())) {
      error = "Please use only letters and numbers.";
    } else if (username.length > 12) {
      error = "Username has to be less than 12 characters long.";
    }
    return error;
  },

  email: (email) => {
    let error = "";
    const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.length === 0) {
      error = "";
    } else if (!re.test(email.toLowerCase())) {
      error = "Please enter a valid email.";
    }
    return error;
  },

  password: (password) => {
    let error = "";
    if (password.length < 8 && password.length > 0) {
      error = "Password has to be more than 8 characters long.";
    } else if (password.length > 30) {
      error = "Password has to be less than 30 characters long.";
    }
    return error;
  },

  repeatPassword: (repeatPassword, password) => {
    return "";
  },

  comparePasswords: (currentField, compareTo) => {
    let error = "";
    if (currentField !== compareTo) {
      error = "Passwords do not match.";
    }
    return error;
  },

  setDefaultErrors: (inputs, errorFields) => {
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

export default validateInputs;
