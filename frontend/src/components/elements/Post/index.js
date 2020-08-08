import React, { useState } from "react";
import axios from "@axios";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";

import {
  PostContainer,
  PostHead,
  PostInfo,
  PostContent,
  Author,
  Date,
  VoteContainer,
  LikeContainer,
  DislikeContainer,
  Button,
  VoteCount,
} from "./styles";
import { Avatar } from "../../ui/routes/Home/NewPost/styles";

const Post = ({ post, history, user }) => {
  post.createdAt = moment(post.createdAt, "MM/DD/YYYY, h:mm:ss A");
  const [votes, setVotes] = useState({
    likes: post.votes.likes.length,
    dislikes: post.votes.dislikes.length,
    liked: post.voted?.liked,
    disliked: post.voted?.disliked,
  });

  const vote = async (event) => {
    event.stopPropagation();
    const type = event.target.name;
    if (user) {
      try {
        const response = await axios.post(`/posts/${post._id}/vote`, {
          type,
          userId: user.id,
        });
        setVotes({ ...response.data });
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("You have to login to vote.");
    }
  };

  const postModal = () => {
    history.push({
      pathname: `/posts/${post._id}`,
      post,
    });
  };

  return (
    <PostContainer onClick={postModal}>
      <Avatar src="https://www.nlg.nhs.uk/content/uploads/2016/04/man.jpg" />
      <PostHead>
        <PostInfo>
          <Author>{post.author.username}</Author>
          <Date>{post.createdAt.fromNow()}</Date>
        </PostInfo>
        <PostContent>
          <p>{post.content}</p>
        </PostContent>
        <VoteContainer>
          <LikeContainer>
            <Button
              name="likes"
              onClick={vote}
              className={`fa${votes.liked ? "s" : "r"} fa-thumbs-up`}
            ></Button>
            <VoteCount>{votes.likes}</VoteCount>
          </LikeContainer>
          <DislikeContainer>
            <Button
              name="dislikes"
              onClick={vote}
              className={`fa${votes.disliked ? "s" : "r"} fa-thumbs-down`}
            ></Button>
            <VoteCount>{votes.dislikes}</VoteCount>
          </DislikeContainer>
        </VoteContainer>
      </PostHead>
    </PostContainer>
  );
};

export default withRouter(Post);
