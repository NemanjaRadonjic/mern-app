export const validateRegister = {
  username: (username) => {
    let errors = "";
    if (username.length === 0) {
      errors = "Please enter your Username.";
    } else if (username.length < 4) {
      errors = "Username has to be more than 4 characters long.";
    } else if (username.length > 12) {
      errors = "Username has to be less than 12 characters long.";
    }
    return errors;
  },

  email: (email) => {
    let errors = "";
    if (email.length === 0) {
      errors = "Please enter your Email.";
    }
    return errors;
  },

  password: (password) => {
    let errors = "";
    if (password.length === 0) {
      errors = "Please enter your Password.";
    } else if (password.length < 8) {
      errors = "Password has to be more than 8 characters long.";
    } else if (password.length > 30) {
      errors = "Password has to be less than 30 characters long.";
    }
    return errors;
  },

  repeatPassword: (repeatPassword) => {
    let errors = "";
    if (repeatPassword.length === 0) {
      errors = "Please repeat your password.";
    }
    return errors;
  },
};
