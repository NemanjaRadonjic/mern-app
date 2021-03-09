import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "@axios";
import getImageSrc from "@helpers/imageSrc";
import { Route, NavLink, Redirect, Switch } from "react-router-dom";
import Posts from "./Posts";
import VotedPosts from "./VotedPosts";
import Images from "./Images";
import EditImage from "@routes/Profile/EditImage";
import ChangeUsername from "@routes/Profile/EditInfo/ChangeUsername";
import ChangeEmail from "@routes/Profile/EditInfo/ChangeEmail";
import ChangePassword from "@routes/Profile/EditInfo/ChangePassword";
import ProtectedRoute from "@routes/ProtectedRoute";

import {
  NavContainer,
  NavContainerPreview,
  ContentContainer,
  AvatarContainer,
  AvatarPreview,
  Username,
  NavbarContainer,
  NavbarItem,
  PermissionDenied,
  Header,
  Message,
} from "./styles";

const Profile = (props) => {
  const user = useSelector((state) => state.user);
  useSelector((state) => state.user?.previewCanvas);
  const { username } = props.match.params;
  const [userInfo, setUserInfo] = useState(null);
  const isSelf = user?.username == username; // ?

  const fetchUser = async () => {
    const response = await axiosInstance.get(`/users/${username}`);
    setUserInfo(response.data);
  };

  useEffect(() => {
    fetchUser();
  }, [username]);

  if (!userInfo) {
    return null;
  }

  return (
    <>
      {user?.previewCanvas && user?.previewCanvas.type == "background" ? (
        <NavContainerPreview
          type="background"
          ref={user.previewCanvas.ref}
        ></NavContainerPreview>
      ) : (
        <NavContainer
          image={getImageSrc(userInfo.background, "background")}
        ></NavContainer>
      )}
      <NavbarContainer>
        <NavbarItem>
          <NavLink
            to={`/user/${username}/posts`}
            className="text-align__center"
            activeClassName="NavLink-active"
          >
            Posts
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink
            to={`/user/${username}/images`}
            className="text-align__center"
            activeClassName="NavLink-active"
          >
            Images
          </NavLink>
        </NavbarItem>
        {user?.previewCanvas && user?.previewCanvas.type === "avatar" ? (
          <AvatarPreview type="avatar" ref={user.previewCanvas.ref} />
        ) : (
          <AvatarContainer src={getImageSrc(userInfo.avatar, "avatar")} />
        )}
        <Username>
          <NavLink className="text-align__center" to={`/user/${username}`}>
            {userInfo.username}
          </NavLink>
        </Username>
        <NavbarItem>
          <NavLink
            to={`/user/${username}/liked`}
            className="text-align__center"
            activeClassName="NavLink-active"
          >
            Liked
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink
            to={`/user/${username}/disliked`}
            className="text-align__center"
            activeClassName="NavLink-active"
          >
            Disliked
          </NavLink>
        </NavbarItem>
      </NavbarContainer>
      <ContentContainer>
        <Switch>
          <Route
            exact
            path="/user/:username"
            render={() => <Redirect to={`/user/${username}/posts`} />}
          />
          <Route exact path={"/user/:username/posts"} component={Posts} />
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
          {user && username === user.username ? (
            <>
              <ProtectedRoute
                path={`/user/:username/settings/avatar`}
                component={EditImage}
                type="avatar"
                redirectTo="/home"
                redirectMsg="You have to log in to see that page"
                userPrivilege
              />
              <ProtectedRoute
                path={`/user/:username/settings/background`}
                component={EditImage}
                type="background"
                redirectTo="/home"
                redirectMsg="You have to log in to see that page"
                userPrivilege
              />
              <ProtectedRoute
                path={`/user/:username/settings/username`}
                component={ChangeUsername}
                type="username"
                redirectTo="/home"
                redirectMsg="You have to log in to see that page"
                userPrivilege
              />
              <ProtectedRoute
                path={`/user/:username/settings/email`}
                component={ChangeEmail}
                type="email"
                redirectTo="/home"
                redirectMsg="You have to log in to see that page"
                userPrivilege
              />
              <ProtectedRoute
                path={`/user/:username/settings/password`}
                component={ChangePassword}
                type="password"
                redirectTo="/home"
                redirectMsg="You have to log in to see that page"
                userPrivilege
              />
            </>
          ) : (
            <PermissionDenied>
              <Header>¯\_(ツ)_/¯</Header>
              <Message>You dont have permission to access this page.</Message>
            </PermissionDenied>
          )}
        </Switch>
      </ContentContainer>
    </>
  );
};

export default Profile;
