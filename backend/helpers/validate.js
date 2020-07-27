const validateRegister = (inputs) => {
  const { username, email, password, repeatPassword } = inputs;
  let errors = {
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  };

  // validate username
  const reUsername = /[^A-Za-z0-9]+/g;
  if (username.length <= 4 && username.length > 0) {
    errors.username = "Username has to be more than 4 characters long.";
  } else if (reUsername.test(username.toLowerCase())) {
    errors.username = "Please use only letters and numbers.";
  } else if (username.length > 12) {
    errors.username = "Username has to be less than 12 characters long.";
  }

  // validate email
  const reEmail = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!reEmail.test(email.toLowerCase())) {
    errors.email = "Please enter a valid email.";
  }

  // validate password
  if (password.length < 8 && password.length > 0) {
    errors.password = "Password has to be more than 8 characters long.";
  } else if (password.length > 30) {
    errors.password = "Password has to be less than 30 characters long.";
  } else if (repeatPassword !== password) {
    errors.repeatPassword = "Passwords do not match";
  }

  return errors;
};

module.exports = {
  validateRegister,
};
