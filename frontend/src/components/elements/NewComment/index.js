import React from "react";
import axiosInstance from "@axios";
import useFormHook from "@hooks/useFormHook";
import { getImageSrc } from "@helpers/imageSrc";
import moment from "moment";

import {
  Container,
  Background,
  AvatarContainer,
  Author,
  Info,
  Counter,
} from "../common/styles";
import { TextArea, NewCommentHead, ButtonContainer, Button } from "./styles";
import { Avatar } from "../../ui/routes/Home/NewPost/styles";

const maxLength = 400;

const NewComment = ({
  user,
  postId,
  setComments,
  comments,
  toggleNewCommentModal,
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

    setComments([response.data, ...comments]);
    toggleNewCommentModal();
  };
  const redirectToProfile = (event) => {
    event.stopPropagation();
    history.push(`/user/${user.username}`);
  };
  return (
    <Container background={getImageSrc(user.background, "background")}>
      <Background paddingBottom>
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
          <Counter>{inputs.comment.length + "/" + maxLength}</Counter>
          <Button
            disabled={!/[A-Za-z0-9]/g.test(inputs.comment)}
            onClick={handleClick}
          >
            Comment
          </Button>
        </NewCommentHead>
      </Background>
    </Container>
  );
};

export default NewComment;
