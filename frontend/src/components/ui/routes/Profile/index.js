import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "@axios";
import getImageSrc from "@helpers/imageSrc";
import { Link } from "react-router-dom";
import { v4 as id } from "uuid";
import Post from "@components/elements/Post";

import {
  ProfileContainer,
  AccountContainer,
  AvatarContainer,
  Username,
  NavbarContainer,
  NavbarItem,
} from "./styles";

const Profile = (props) => {
  const { username } = props.match.params;
  const user = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  console.log(userPosts);
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axiosInstance.get(`/users/${username}`);
      setUserInfo(response.data);
    };
    const fetchUserPosts = async () => {
      const response = await axiosInstance.get(`/users/${username}/posts`);
      setUserPosts(response.data.reverse());
    };
    fetchUser();
    fetchUserPosts();
  }, [props.match.params.username]);
  const renderPosts =
    userPosts &&
    userPosts.map((post) => {
      return <Post key={id()} post={post} user={user} />;
    });

  if (!userInfo) {
    return null;
  }

  return (
    <>
      <ProfileContainer image={getImageSrc(userInfo, "background")}>
        <AvatarContainer src={getImageSrc(userInfo, "avatar")} />
      </ProfileContainer>
      <NavbarContainer>
        <NavbarItem>
          <Link className="text-align__center">Posts</Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-align__center">Images</Link>
        </NavbarItem>
        <Username>{userInfo.username}</Username>
        <NavbarItem>
          <Link className="text-align__center">Likes</Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-align__center">Dislikes</Link>
        </NavbarItem>
      </NavbarContainer>
      <AccountContainer>{renderPosts}</AccountContainer>
    </>
  );
};

export default Profile;
