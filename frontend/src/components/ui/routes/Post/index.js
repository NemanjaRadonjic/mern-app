import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "@axios";

import {
  Container,
  PostSection,
  PostHead,
  PostInfo,
  PostContent,
  Author,
  Date,
  CommentSection,
} from "./styles";

const Post = (props) => {
  const { postId } = props.match.params;
  const [post, setPost] = useState(props.location.post);
  useEffect(() => {
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
  if (post) {
    return (
      <Container>
        <PostSection>
          <PostHead>
            <PostInfo>
              <Author>{post.author.username}</Author>
              <Date>{post.createdAt.fromNow()}</Date>
            </PostInfo>
            <PostContent>{post.content}</PostContent>
          </PostHead>
        </PostSection>
        <CommentSection></CommentSection>
      </Container>
    );
  }
  return null;
};

export default Post;
