import React from "react";
import axiosInstance from "@axios";
import useFormHook from "@hooks/useFormHook";
import { getImageSrc } from "@helpers/imageSrc";

import { Container, Avatar, TextArea } from "./styles";
import { Button } from "@styles/common";

const maxLength = 400;

const NewComment = ({ avatar, postId, userId, history }) => {
  const { inputs, onChange } = useFormHook({ comment: "" });

  const handleClick = async () => {
    const reqBody = {
      content: inputs.comment,
      postId,
      userId,
    };
    const accessToken = JSON.parse(window.localStorage.getItem("accessToken"));
    axiosInstance.defaults.headers.authorization = "Bearer " + accessToken;
    const response = await axiosInstance.post(
      `/posts/${postId}/comment`,
      reqBody
    );
    console.log(response.data._doc);
    history.push(`/posts/${postId}`);
  };
  return (
    <Container>
      <Avatar src={getImageSrc(avatar)} />
      <TextArea
        name="comment"
        spellCheck="false"
        placeholder="Comment something..."
        maxLength={maxLength}
        rows="2"
        value={inputs.comment}
        onChange={onChange}
      />
      <Button onClick={handleClick}>Comment</Button>
    </Container>
  );
};

export default NewComment;
