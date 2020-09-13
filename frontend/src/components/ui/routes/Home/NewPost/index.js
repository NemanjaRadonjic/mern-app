import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axiosInstance from "@axios";
import useFormHook from "@hooks/useFormHook";
import getImageSrc from "@helpers/imageSrc";

import { Button } from "@styles/common";
import {
  Container,
  TopSection,
  BottomSection,
  Avatar,
  TextArea,
  Error,
  Message,
} from "./styles";

const maxLength = 400;

const NewPost = ({ posts, setPosts }) => {
  const user = useSelector((state) => state.user);

  const {
    inputs,
    onChange,
    setInputs,
    errors,
    setErrors,
    fields,
  } = useFormHook({
    post: "",
  });

  const createPost = async (event) => {
    event.preventDefault();
    if (inputs.post.length === 0) {
      setErrors({ post: "What do you want to post?" });
    } else {
      const accessToken = JSON.parse(
        window.localStorage.getItem("accessToken")
      );
      const requestBody = {
        content: inputs.post,
        id: user.id,
      };
      try {
        axiosInstance.defaults.headers.authorization = "Bearer " + accessToken;
        const response = await axiosInstance.post("/posts/create", requestBody);
        setPosts([{ ...response.data._doc }, ...posts]);
      } catch (error) {
        console.log(error);
      }
      setInputs({ ...fields });
    }
  };

  return (
    <Container>
      {user ? (
        <>
          <TopSection>
            <Avatar src={getImageSrc(user.avatar, "avatar")} />
            <TextArea
              name="post"
              maxLength={maxLength}
              rows="1"
              onChange={onChange}
              value={inputs.post}
              placeholder="Post something..."
            />
            {maxLength + "/" + inputs.post.length}
          </TopSection>
          <BottomSection>
            <Error>{errors.post}</Error>
            <Button className="align-center" type="submit" onClick={createPost}>
              Post
            </Button>
          </BottomSection>
        </>
      ) : (
        <>
          <TopSection>
            <Message>You have to be logged in to post something</Message>
          </TopSection>
        </>
      )}
    </Container>
  );
};

export default NewPost;
