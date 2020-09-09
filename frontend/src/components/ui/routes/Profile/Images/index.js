import React, { useEffect, useState } from "react";
import axiosInstance from "@axios";
import getImageSrc from "@helpers/imageSrc";
import { v4 as id } from "uuid";

import { Avatars, Avatar, Backgrounds, Background, Header } from "./styles";

const Images = (props) => {
  const { username } = props.match.params;
  const [images, setImages] = useState({
    avatars: null,
    backgrounds: null,
  });
  useEffect(() => {
    const fetchUserImages = async () => {
      const response = await axiosInstance.get(`users/${username}/images`);
      setImages({
        avatars: response.data.avatars.reverse(),
        backgrounds: response.data.backgrounds.reverse(),
      });
    };
    fetchUserImages();
  }, []);

  const renderAvatars = () => {
    return images.avatars?.length > 0 ? (
      <>
        <Header>Avatars</Header>
        {images.avatars &&
          images.avatars.map((avatar) => (
            <Avatar key={id()} src={getImageSrc(avatar)} />
          ))}
      </>
    ) : (
      <Header>User didnt upload any Avatars...</Header>
    );
  };
  const renderBackgrounds = () => {
    return images.backgrounds?.length > 0 ? (
      <>
        <Header>Avatars</Header>
        {images.backgrounds &&
          images.backgrounds.map((background) => (
            <Background key={id()} src={getImageSrc(background)} />
          ))}
      </>
    ) : (
      <Header>User didnt upload any Backgrounds...</Header>
    );
  };
  return (
    <>
      <Avatars>{renderAvatars()}</Avatars>
      <Backgrounds>{renderBackgrounds()}</Backgrounds>
    </>
  );
};

export default Images;
