import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import axiosInstance from "@axios";
import getImageSrc from "@helpers/imageSrc";
import { Link } from "react-router-dom";
import Posts from "./Posts";
import VotedPosts from "./VotedPosts";
import Images from "./Images";
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
      <NavContainer image={getImageSrc(userInfo.background, "background")}>
        <AvatarContainer src={getImageSrc(userInfo.avatar, "avatar")} />
      </NavContainer>
      <NavbarContainer>
        <NavbarItem>
          <Link to={`/user/${username}/posts`} className="text-align__center">
            Posts
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to={`/user/${username}/images`} className="text-align__center">
            Images
          </Link>
        </NavbarItem>
        <Username>{userInfo.username}</Username>
        <NavbarItem>
          <Link to={`/user/${username}/liked`} className="text-align__center">
            Liked
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            to={`/user/${username}/disliked`}
            className="text-align__center"
          >
            Disliked
          </Link>
        </NavbarItem>
      </NavbarContainer>

      <ContentContainer>
        <Route path={"/user/:username/posts"} component={Posts} />
        <Route path={"/user/:username/images"} component={Images} />
        <Route
          path={"/user/:username/liked"}
          render={() => {
            return <VotedPosts type="liked" match={props.match} />;
          }}
        />
        <Route
          path={"/user/:username/disliked"}
          render={() => {
            return <VotedPosts type="disliked" match={props.match} />;
          }}
        />
      </ContentContainer>
    </>
  );
};

export default Profile;
