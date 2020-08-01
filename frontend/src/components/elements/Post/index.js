import React from "react";
import {
  PostContainer,
  PostHead,
  PostInfo,
  PostContent,
  Title,
  Author,
  Date,
} from "./styles";

const Post = ({ post, createdAt }) => {
  return (
    <PostContainer>
      <PostHead>
        <PostInfo>
          <Author>{post.author.username}</Author>
          <Date>{createdAt.fromNow()}</Date>
        </PostInfo>
      </PostHead>
      <PostContent>{post.content}</PostContent>
    </PostContainer>
  );
};

export default Post;
