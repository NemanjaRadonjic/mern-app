import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "@axios";

import { Container, PostSection, CommentSection } from "./styles";

import PostComponent from "@components/elements/Post";

const Post = (props) => {
  const { postId } = props.match.params;
  const [post, setPost] = useState(props.location.post);
  useEffect(() => {
    console.log(post);
    const fetchPost = async () => {
      if (!post) {
        const response = await axios.get(`/posts/${postId}`);
        setPost({
          ...response.data,
          createdAt: moment(response.data.createdAt, "MM/DD/YYYY, h:mm:ss A"),
        });
      }
    };
    fetchPost();
  });
  console.log(post);
  if (post) {
    return (
      <Container>
        <PostSection>
          <PostComponent post={post} />
        </PostSection>
        <CommentSection></CommentSection>
      </Container>
    );
  }
  return null;
};

export default Post;
