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

const Post = ({ post, history, location }) => {
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
                className={`far fa-comment`}
                onClick={redirectToComment}
              />
              <Count>0</Count>
            </ItemContainer>
            <ItemContainer>
              <Button
                name="likes"
                onClick={vote}
                className={`fa${votes.liked ? "s" : "r"} fa-thumbs-up`}
              />
              <Count>{votes.likes}</Count>
            </ItemContainer>
            <ItemContainer>
              <Button
                name="dislikes"
                onClick={vote}
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
