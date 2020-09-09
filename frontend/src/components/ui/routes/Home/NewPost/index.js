import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axiosInstance from "@axios";
import getImageSrc from "@helpers/imageSrc";
import {
  Container,
  TopSection,
  BottomSection,
  Avatar,
  TextArea,
  Error,
  Button,
  Message,
} from "./styles";

const maxLength = 400;

const NewPost = ({ posts, setPosts }) => {
  const user = useSelector((state) => state.user);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const onChange = (event) => {
    setInput(event.target.value);
    setError("");
  };
  const createPost = async (event) => {
    event.preventDefault();
    if (input.length === 0) {
      setError("What do you want to post?");
    } else {
      const accessToken = JSON.parse(
        window.localStorage.getItem("accessToken")
      );
      const requestBody = {
        content: input,
        id: user.id,
      };
      try {
        axiosInstance.defaults.headers.authorization = "Bearer " + accessToken;
        const response = await axiosInstance.post("/posts/create", requestBody);
        setPosts([{ ...response.data._doc }, ...posts]);
      } catch (error) {
        console.log(error);
      }
      setInput("");
    }
  };

  return (
    <Container>
      {user ? (
        <>
          <TopSection>
            <Avatar src={getImageSrc(user.avatar, "avatar")} />
            <TextArea
              maxLength={maxLength}
              rows="1"
              onChange={onChange}
              value={input}
              placeholder="Post something..."
            />
            {maxLength + "/" + input.length}
          </TopSection>
          <BottomSection>
            <Error>{error}</Error>
            <Button type="submit" onClick={createPost}>
              Post
            </Button>
          </BottomSection>
        </>
      ) : (
        <>
          <TopSection>
            <Message>You have to be logged in to post something</Message>
          </TopSection>
          <BottomSection>
            <Message>
              <Link to="/login">
                - If you do have an account click here to login
              </Link>
              <Link to="/register">
                - If you dont have an account you can register here.
              </Link>
            </Message>
          </BottomSection>
        </>
      )}
    </Container>
  );
};

export default NewPost;
