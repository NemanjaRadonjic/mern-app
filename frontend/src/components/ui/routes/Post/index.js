import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "@axios";

import PostComponent from "@components/elements/Post";

import { Container, PostSection, CommentSection } from "./styles";
import { NoContentMessage, Loader } from "@styles/common";

const Post = (props) => {
  const { postId } = props.match.params;
  const [post, setPost] = useState(null);
  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(`/posts/${postId}`);
      setPost({
        ...response.data,
        createdAt: moment(response.data.createdAt, "MM/DD/YYYY, h:mm:ss A"),
      });
    };
    fetchPost();
  }, []);
  if (post) {
    return (
      <Container>
        <PostSection>
          <PostComponent post={post} />
        </PostSection>
        <CommentSection>
          <NoContentMessage>No one made any comments yet :(</NoContentMessage>
        </CommentSection>
      </Container>
    );
  }
  return <Loader />;
};

export default Post;
