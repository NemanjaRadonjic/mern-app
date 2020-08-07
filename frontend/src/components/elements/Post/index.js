import React, { useState } from "react";
import axios from "@axios";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment";

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

const Post = ({ post, history, userId }) => {
  post.createdAt = moment(post.createdAt, "MM/DD/YYYY, h:mm:ss A");
  const [votes, setVotes] = useState({
    likes: { count: post.votes.likes.length, voted: false },
    dislikes: { count: post.votes.dislikes.length, voted: false },
  });

  const vote = async (event) => {
    event.stopPropagation();
    const type = event.target.name;
    if (userId) {
      try {
        await axios.post(`/posts/${post._id}/vote`, {
          type,
          userId,
        });
        setVotes({
          ...votes,
          [type]: { count: votes[type].count + 1, voted: true },
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("You have to login to vote");
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
              className={`fa${
                votes.likes.voted || post.voted?.liked ? "s" : "r"
              } fa-thumbs-up`}
            ></Button>
            <VoteCount>{votes.likes.count}</VoteCount>
          </LikeContainer>
          <DislikeContainer>
            <Button
              name="dislikes"
              onClick={vote}
              className={`fa${
                votes.dislikes.voted || post.voted?.disliked ? "s" : "r"
              } fa-thumbs-down`}
            ></Button>
            <VoteCount>{votes.dislikes.count}</VoteCount>
          </DislikeContainer>
        </VoteContainer>
      </PostHead>
    </PostContainer>
  );
};

export default withRouter(Post);
