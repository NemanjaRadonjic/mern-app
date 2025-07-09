import React from "react";
import { useSelector } from "react-redux";
import axiosInstance from "@axios";
import useFormHook from "@hooks/useFormHook";

import { Button } from "@styles/common";
import {
  Container,
  TopSection,
  BottomSection,
  Avatar,
  TextArea,
  Counter,
  Error,
  Message,
} from "./styles";

const maxLength = 400;

const NewPost = ({ posts, setPosts }) => {
  const user = useSelector((state) => state.user);

  const { inputs, onChange, setInputs, errors, fields } = useFormHook({
    post: "",
  });

  const createPost = async (event) => {
    event.preventDefault();

    const requestBody = {
      content: inputs.post,
      id: user.id,
    };
    try {
      const response = await axiosInstance.post("/posts/create", requestBody);

      setPosts([response.data, ...posts]);
    } catch (error) {
      console.log(error);
    }
    setInputs({ ...fields });
  };

  return (
    <Container>
      {user ? (
        <>
          <TopSection>
            <Avatar src={user.avatar} />
            <TextArea
              notValid={!/[A-Za-z0-9]/g.test(inputs.post)}
              spellCheck="false"
              name="post"
              maxLength={maxLength}
              rows="2"
              onChange={onChange}
              value={inputs.post}
              placeholder="Post something..."
            />
            <Counter filled={inputs.post.length >= maxLength}>
              {inputs.post.length + "/" + maxLength}
            </Counter>
          </TopSection>
          <BottomSection>
            <Error>{errors.post}</Error>
            <Button
              disabled={!/[A-Za-z0-9]/g.test(inputs.post)}
              className="force-center"
              type="submit"
              onClick={createPost}
            >
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
