import React, { useContext } from "react";
import axiosInstance from "@axios";
import useFormHook from "@hooks/useFormHook";
import { getImageSrc } from "@helpers/imageSrc";
import ThemeContext from "@context/theme";

import { Background, AvatarContainer, Author, Info } from "../common/styles";
import { Counter, Container, TextArea, NewCommentHead } from "./styles";
import { Button } from "@styles/common";
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
  const {
    themeInfo: { mode },
  } = useContext(ThemeContext);

  const { inputs, onChange } = useFormHook({ comment: "" });

  const handleClick = async () => {
    const reqBody = {
      content: inputs.comment,
      postId,
      userId: user.id,
    };
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
    <Container
      mode={mode}
      background={getImageSrc(user.background, "background")}
    >
      <Background noHover paddingBottom>
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
            className="force-center"
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
