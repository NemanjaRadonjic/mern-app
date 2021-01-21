export const login = (userData) => {
  return { type: "LOGIN", payload: userData };
};

export const logout = () => {
  return { type: "LOGOUT" };
};

export const changeImage = (image, imgType) => {
  return { type: "CHANGE_IMAGE", payload: image, imgType };
};

export const setPreviewCanvas = (previewCanvas) => {
  return { type: "SET_PREVIEW_CANVAS", payload: previewCanvas };
};

export const changeUsername = (newUsername) => {
  return { type: "CHANGE_USERNAME", payload: newUsername };
};
