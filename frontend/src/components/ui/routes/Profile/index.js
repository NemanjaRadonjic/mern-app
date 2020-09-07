import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import axiosInstance from "@axios";
import getImageSrc from "@helpers/imageSrc";
import { Link } from "react-router-dom";
import Posts from "./Posts";

import {
  NavContainer,
  ContentContainer,
  AvatarContainer,
  Username,
  NavbarContainer,
  NavbarItem,
} from "./styles";

const Profile = (props) => {
  const { username } = props.match.params;
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axiosInstance.get(`/users/${username}`);
      setUserInfo(response.data);
    };
    fetchUser();
  }, [props.match.params.username]);

  if (!userInfo) {
    return null;
  }

  return (
    <>
      <NavContainer image={getImageSrc(userInfo, "background")}>
        <AvatarContainer src={getImageSrc(userInfo, "avatar")} />
      </NavContainer>
      <NavbarContainer>
        <NavbarItem>
          <Link to="posts" className="text-align__center">
            Posts
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="images" className="text-align__center">
            Images
          </Link>
        </NavbarItem>
        <Username>{userInfo.username}</Username>
        <NavbarItem>
          <Link to="likes" className="text-align__center">
            Likes
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="dislikes" className="text-align__center">
            Dislikes
          </Link>
        </NavbarItem>
      </NavbarContainer>
      <ContentContainer>
        <Route path={"/user/:username/posts"} component={Posts} />
        <Route path={"/user/:username/images"} component={() => "images"} />
        <Route path={"/user/:username/likes"} component={() => "likes"} />
        <Route path={"/user/:username/dislikes"} component={() => "dislikes"} />
      </ContentContainer>
    </>
  );
};

export default Profile;
