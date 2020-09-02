const avatarSrc = (user) => {
  const defaultAvatar = "uploads/profile/AvatarDefault.jpg";
  return `http://localhost:4000/${user ? user.avatar : defaultAvatar}`;
};

export default avatarSrc;
