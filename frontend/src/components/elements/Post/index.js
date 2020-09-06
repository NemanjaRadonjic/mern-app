import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import getImageSrc from "@helpers/imageSrc";

import {
  PostContainer,
  PostBackground,
  PostHead,
  PostInfo,
  PostContent,
  Author,
  Time,
  VoteContainer,
  LikeContainer,
  DislikeContainer,
  Button,
  VoteCount,
} from "./styles";
import { Avatar } from "../../ui/routes/Home/NewPost/styles";
import axiosInstance from "@axios";
import { useSelector } from "react-redux";

const Post = ({ post, history }) => {
  console.log(post);
  const user = useSelector((state) => state.user);
  post.createdAt = moment(post.createdAt, "MM/DD/YYYY, h:mm:ss A");
  const [votes, setVotes] = useState({
    likes: post.votes.likes.length,
    dislikes: post.votes.dislikes.length,
    liked: post.votes.likes.includes(user?.id),
    disliked: post.votes.dislikes.includes(user?.id),
  });
  const background = `http://localhost:4000/uploads/${
    post.author.background?.split("\\")[1]
  }`;

  const vote = async (event) => {
    event.stopPropagation();
    const type = event.target.name;
    if (user) {
      const accessToken = JSON.parse(
        window.localStorage.getItem("accessToken")
      );
      try {
        axiosInstance.defaults.headers.authorization = "Bearer " + accessToken;
        const response = await axiosInstance.post(`/posts/${post._id}/vote`, {
          type,
          userId: user.id,
        });

        let updatedVotes = {
          ...votes,
          liked: response.data.liked,
          disliked: response.data.disliked,
        };
        if (votes.liked || votes.disliked) {
          if (updatedVotes.liked) {
            if (votes.liked) {
              updatedVotes.likes = updatedVotes.likes - 1;
            } else {
              updatedVotes.likes = updatedVotes.likes + 1;
              updatedVotes.dislikes = updatedVotes.dislikes - 1;
            }
          } else if (updatedVotes.disliked) {
            if (votes.disliked) {
              updatedVotes.dislikes = updatedVotes.dislikes - 1;
            } else {
              updatedVotes.likes = updatedVotes.likes - 1;
              updatedVotes.dislikes = updatedVotes.dislikes + 1;
            }
          } else {
            if (type === "likes") {
              updatedVotes.likes = updatedVotes.likes - 1;
            } else {
              updatedVotes.dislikes = updatedVotes.dislikes - 1;
            }
          }
        } else {
          if (updatedVotes.liked) {
            updatedVotes.likes = updatedVotes.likes + 1;
          } else {
            updatedVotes.dislikes = updatedVotes.dislikes + 1;
          }
        }
        setVotes(updatedVotes);
      } catch (error) {}
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
    <PostContainer onClick={postModal} background={background}>
      <PostBackground>
        <Avatar src={getImageSrc(post.author, "avatar")} />
        <PostHead>
          <PostInfo>
            <Author>{post.author.username}</Author>
            <Time>{post.createdAt.fromNow()}</Time>
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
      </PostBackground>
    </PostContainer>
  );
};

export default withRouter(Post);
