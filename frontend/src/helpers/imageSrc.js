export const getImageSrc = (image, type) => {
  if (type === "background") {
    const backgroundSrc = image?.split("\\")[1];
    return `http://localhost:4000/uploads/${image ? backgroundSrc : ""}`;
  }
  return `http://localhost:4000/${image ? image : "uploads/AvatarDefault.jpg"}`;
};

export default getImageSrc;
