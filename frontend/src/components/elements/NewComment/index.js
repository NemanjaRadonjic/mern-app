import React from "react";
import axiosInstance from "@axios";
import useFormHook from "@hooks/useFormHook";
import { getImageSrc } from "@helpers/imageSrc";

import {
  Container,
  Background,
  AvatarContainer,
  Author,
  Info,
} from "../common/styles";
import { Button } from "@styles/common";
import { TextArea, NewCommentHead, ButtonContainer } from "./styles";
import { Avatar } from "../../ui/routes/Home/NewPost/styles";

const maxLength = 400;

const NewComment = ({
  user,
  postId,
  userId,
  setComments,
  comments,
  toggleNewCommentActive,
  history,
}) => {
  const { inputs, onChange } = useFormHook({ comment: "" });

  const handleClick = async () => {
    const reqBody = {
      content: inputs.comment,
      postId,
      userId: user.id,
    };
    const accessToken = JSON.parse(window.localStorage.getItem("accessToken"));
    axiosInstance.defaults.headers.authorization = "Bearer " + accessToken;
    const response = await axiosInstance.post(
      `/posts/${postId}/comment`,
      reqBody
    );
    setComments([response.data._doc, ...comments]);
    toggleNewCommentActive();
  };
  const redirectToProfile = (event) => {
    event.stopPropagation();
    history.push(`/user/${user.username}`);
  };
  return (
    <Container background={getImageSrc(user.background, "background")}>
      <Background>
        <AvatarContainer>
          <Avatar
            src={getImageSrc(user.avatar, "avatar")}
            onClick={redirectToProfile}
          />
        </AvatarContainer>
        <NewCommentHead>
          <Info>
            <Author
              onClick={(event) => {
                event.stopPropagation();
                history.push(`/user/${user.username}`);
              }}
            >
              {user.username}
            </Author>
          </Info>
          <TextArea
            name="comment"
            spellCheck="false"
            placeholder="Comment something..."
            maxLength={maxLength}
            rows="2"
            value={inputs.comment}
            onChange={onChange}
          />
          <ButtonContainer>
            <Button onClick={handleClick}>Comment</Button>
          </ButtonContainer>
        </NewCommentHead>
      </Background>
    </Container>
  );
};

export default NewComment;
