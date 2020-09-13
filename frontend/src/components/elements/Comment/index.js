import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import getImageSrc from "@helpers/imageSrc";

import {
  Container,
  Background,
  AvatarContainer,
  Author,
  Head,
  Info,
  Time,
  VoteContainer,
  ItemContainer,
  Button,
  Count,
} from "../common/styles";
import { CommentContent } from "./styles";
import { Avatar } from "../../ui/routes/Home/NewPost/styles";
import axiosInstance from "@axios";
import { useSelector } from "react-redux";

const Comment = ({ comment, history }) => {
  const user = useSelector((state) => state.user);
  const convertedDate = moment(comment.createdAt, "MM/DD/YYYY, h:mm:ss A");

  const [votes, setVotes] = useState({
    likes: comment.votes.likes.length,
    dislikes: comment.votes.dislikes.length,
    liked: comment.votes.likes.includes(user?.id),
    disliked: comment.votes.dislikes.includes(user?.id),
  });
  const background = `http://localhost:4000/uploads/${
    comment.author.background?.split("\\")[1]
  }`;

  const like = async (event) => {
    if (user) {
      const accessToken = JSON.parse(
        window.localStorage.getItem("accessToken")
      );
      try {
        axiosInstance.defaults.headers.authorization = "Bearer " + accessToken;
        const response = await axiosInstance.post(
          `comments/${comment._id}/${type}`,
          { userId: user.id }
        );

        let updatedVotes = {
          ...votes,
          ...response.data,
        };

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

        setVotes(updatedVotes);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong...");
      }
    } else {
      toast.error("You have to login to vote.");
    }
  };

  const dislike = async () => {
    if (user) {
      const accessToken = JSON.parse(
        window.localStorage.getItem("accessToken")
      );
      try {
        axiosInstance.defaults.headers.authorization = "Bearer " + accessToken;
        const response = await axiosInstance.post(
          `comments/${comment._id}/dislike`,
          { userId: user.id }
        );

        let updatedVotes = {
          ...votes,
          ...response.data,
        };

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

        setVotes(updatedVotes);
      } catch (error) {
        toast.error("Something went wrong...");
      }
    } else {
      toast.error("You have to login to vote.");
    }
  };

  const redirectToProfile = (event) => {
    event.stopPropagation();
    history.push(`/user/${comment.author.username}`);
  };

  return (
    <Container background={background}>
      <Background>
        <AvatarContainer>
          <Avatar
            src={getImageSrc(comment.author.avatar, "avatar")}
            onClick={redirectToProfile}
          />
        </AvatarContainer>
        <Head>
          <Info>
            <Author
              onClick={(event) => {
                event.stopPropagation();
                history.push(`/user/${comment.author.username}`);
              }}
            >
              {comment.author.username}
            </Author>
            <Time>{convertedDate.fromNow()}</Time>
          </Info>
          <CommentContent>
            <p>{comment.content}</p>
          </CommentContent>
          <VoteContainer>
            <ItemContainer>
              <Button
                name="like"
                onClick={like}
                className={`fa${votes.liked ? "s" : "r"} fa-thumbs-up`}
              />
              <Count>{votes.likes}</Count>
            </ItemContainer>
            <ItemContainer>
              <Button
                name="dislike"
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

export default Comment;
