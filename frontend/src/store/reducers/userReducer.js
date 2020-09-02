const userReducer = (state = null, action) => {
  const newState = state;
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return null;
    case "CHANGE_AVATAR":
      newState.avatar = action.payload;
      return newState;
    default:
      return state;
  }
};

export default userReducer;
