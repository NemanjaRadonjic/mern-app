import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import getImageSrc from "@helpers/imageSrc";

import {
  Container,
  Background,
  Author,
  Info,
  Head,
  Time,
  VoteContainer,
  ItemContainer,
  Button,
  Count,
} from "../common/styles";
import { PostContent } from "./styles";
import { Avatar } from "../../ui/routes/Home/NewPost/styles";
import axiosInstance from "@axios";
import { useSelector } from "react-redux";

const Post = ({ post, history, location, commentActive }) => {
  const postCopy = location.post;
  const user = useSelector((state) => state.user);
  post.createdAt = moment(post.createdAt, "MM/DD/YYYY, h:mm:ss A");

  const [votes, setVotes] = useState({
    likes: postCopy ? postCopy.votes.likes : post.votes.likes.length,
    dislikes: postCopy ? postCopy.votes.dislikes : post.votes.dislikes.length,
    liked: postCopy
      ? postCopy.votes.liked
      : post.votes.likes.includes(user?.id),
    disliked: postCopy
      ? postCopy.votes.disliked
      : post.votes.dislikes.includes(user?.id),
  });

  const background = `http://localhost:4000/uploads/${
    post.author.background?.split("\\")[1]
  }`;

  const like = async (event) => {
    event.stopPropagation();
    if (user) {
      const accessToken = JSON.parse(
        window.localStorage.getItem("accessToken")
      );
      try {
        axiosInstance.defaults.headers.authorization = "Bearer " + accessToken;
        const response = await axiosInstance.post(`/posts/${post._id}/like`, {
          userId: user.id,
        });

        const { liked, disliked } = response.data;
        let updatedVotes = { ...votes, liked, disliked };

        if (votes.liked) {
          updatedVotes.likes--;
        } else {
          if (votes.disliked) {
            updatedVotes.dislikes--;
            updatedVotes.likes++;
          } else {
            updatedVotes.likes++;
          }
        }
        setVotes({ ...updatedVotes });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const dislike = async (event) => {
    event.stopPropagation();
    if (user) {
      const accessToken = JSON.parse(
        window.localStorage.getItem("accessToken")
      );
      try {
        axiosInstance.defaults.headers.authorization = "Bearer " + accessToken;
        const response = await axiosInstance.post(
          `/posts/${post._id}/dislike`,
          {
            userId: user.id,
          }
        );

        const { liked, disliked } = response.data;
        let updatedVotes = { ...votes, liked, disliked };

        if (votes.disliked) {
          updatedVotes.dislikes--;
        } else {
          if (votes.liked) {
            updatedVotes.likes--;
            updatedVotes.dislikes++;
          } else {
            updatedVotes.dislikes++;
          }
        }
        setVotes({ ...updatedVotes });
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("You have to login to vote.");
    }
  };

  const updatedPost = { ...post, votes };

  const redirectToPost = () => {
    history.push({
      pathname: `/posts/${post._id}`,
      post: updatedPost,
    });
  };

  const redirectToProfile = (event) => {
    event.stopPropagation();
    history.push(`/user/${post.author.username}`);
  };

  const redirectToComment = (event) => {
    event.stopPropagation();
    history.push({ pathname: `/posts/${post._id}/comment`, post: updatedPost });
  };

  return (
    <Container onClick={redirectToPost} background={background}>
      <Background post>
        <Head>
          <Info>
            <Avatar
              src={getImageSrc(post.author.avatar, "avatar")}
              onClick={redirectToProfile}
            />
            <Author
              post
              onClick={(event) => {
                event.stopPropagation();
                history.push(`/user/${post.author.username}`);
              }}
            >
              {post.author.username}
            </Author>
            <Time>{post.createdAt.fromNow()}</Time>
          </Info>
          <PostContent>
            <p>{post.content}</p>
          </PostContent>
          <VoteContainer>
            <ItemContainer>
              <Button
                className={`fa${commentActive ? "s" : "r"} fa-comment`}
                onClick={redirectToComment}
              />
              <Count>{post.comments.length}</Count>
            </ItemContainer>
            <ItemContainer>
              <Button
                onClick={like}
                className={`fa${votes.liked ? "s" : "r"} fa-thumbs-up`}
              />
              <Count>{votes.likes}</Count>
            </ItemContainer>
            <ItemContainer>
              <Button
                onClick={dislike}
                className={`fa${votes.disliked ? "s" : "r"} fa-thumbs-down`}
              />
              <Count>{votes.dislikes}</Count>
            </ItemContainer>
          </VoteContainer>
        </Head>
      </Background>
    </Container>
  );
};

export default withRouter(Post);
