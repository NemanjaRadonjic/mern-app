export const login = (userData) => {
  return { type: "LOGIN", payload: userData };
};

export const logout = () => {
  return { type: "LOGOUT" };
};

export const changeAvatar = (avatar) => {
  return { type: "CHANGE_AVATAR", payload: avatar };
};
