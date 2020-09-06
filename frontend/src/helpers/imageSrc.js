export const imageSrc = (user, type) => {
  if (type === "background") {
    const backgroundSrc = user?.background?.split("\\")[1];
    return `http://localhost:4000/uploads/${
      user?.background ? backgroundSrc : ""
    }`;
  }
  return `http://localhost:4000/${
    user?.avatar ? user.avatar : "uploads/AvatarDefault.jpg"
  }`;
};

export default imageSrc;
