import React from "react";
import {
  PostContainer,
  PostHead,
  PostInfo,
  PostContent,
  Author,
  Date,
} from "./styles";
import { Avatar } from "../../ui/routes/Home/NewPost/styles";

const Post = ({ post, createdAt }) => {
  return (
    <PostContainer>
      <Avatar src="https://www.nlg.nhs.uk/content/uploads/2016/04/man.jpg" />
      <PostHead>
        <PostInfo>
          <Author>{post.author.username}</Author>
          <Date>{createdAt.fromNow()}</Date>
        </PostInfo>
        <PostContent>{post.content}</PostContent>
      </PostHead>
    </PostContainer>
  );
};

export default Post;
