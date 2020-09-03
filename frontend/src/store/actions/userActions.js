export const login = (userData) => {
  return { type: "LOGIN", payload: userData };
};

export const logout = () => {
  return { type: "LOGOUT" };
};

export const changeImage = (image, imgType) => {
  return { type: "CHANGE_IMAGE", payload: image, imgType };
};
