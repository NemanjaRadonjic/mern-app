const avatarSrc = (user) => {
  const defaultAvatar = "uploads/AvatarDefault.jpg";
  return `http://localhost:4000/${user?.avatar ? user.avatar : defaultAvatar}`;
};

export default avatarSrc;
