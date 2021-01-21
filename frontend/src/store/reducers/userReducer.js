const userReducer = (state = null, action) => {
  const newState = { ...state };
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return null;
    case "CHANGE_IMAGE":
      newState[action.imgType] = action.payload;
      return newState;
    case "SET_PREVIEW_CANVAS":
      newState.previewCanvas = action.payload;
      return newState;
    case "CHANGE_USERNAME":
      newState.username = action.payload;
      return newState;
    default:
      return state;
  }
};

export default userReducer;
