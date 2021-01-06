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
  RemoveButton,
  Message,
  ButtonContainer,
  RemoveModal,
  Count,
  Settings,
  Setting,
} from "../common/styles";
import { CommentContent } from "./styles";
import { Avatar } from "../../ui/routes/Home/NewPost/styles";

import axiosInstance from "@axios";
import { useSelector } from "react-redux";

const Comment = ({ comment, history, comments, setComments }) => {
  console.log("comment: ", comment);
  const user = useSelector((state) => state.user);
  const authorSelf = comment.author?.username == user?.username;
  const accessToken = JSON.parse(window.localStorage.getItem("accessToken"));
  axiosInstance.defaults.headers.authorization = "Bearer " + accessToken;
  const convertedDate = moment(comment.createdAt, "MM/DD/YYYY, h:mm:ss A");
  const [deleteModal, setDeleteModal] = useState(false);
  const [votes, setVotes] = useState({
    likes: comment.votes.likes.length,
    dislikes: comment.votes.dislikes.length,
    liked: comment.votes.likes.includes(user?.id),
    disliked: comment.votes.dislikes.includes(user?.id),
  });
  const background = `http://localhost:4000/uploads/${
    comment.author.background?.split("\\")[1]
  }`;

  const like = async () => {
    if (user) {
      try {
        const response = await axiosInstance.post(
          `comments/${comment._id}/like`,
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
      try {
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
  const toggleRemoveModal = (event) => {
    event.stopPropagation();
    setDeleteModal(!deleteModal);
  };
  const handleClickRemove = async () => {
    try {
      await axiosInstance.delete(`/comments/${comment._id}/remove`);
      setComments(comments.filter((c) => c._id != comment._id));
      toast.error("The comment is removed");
    } catch (error) {
      console.log(error);
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
      {authorSelf && (
        <Settings>
          <Setting className="fas fa-edit" />
          <Setting onClick={toggleRemoveModal} className="fas fa-trash-alt" />
        </Settings>
      )}{" "}
      {deleteModal && (
        <RemoveModal>
          <Message>Are you sure you want to delete this comment ?</Message>
          <ButtonContainer>
            <RemoveButton onClick={toggleRemoveModal}>No</RemoveButton>
            <RemoveButton onClick={handleClickRemove}>Yes</RemoveButton>
          </ButtonContainer>
        </RemoveModal>
      )}
    </Container>
  );
};

export default Comment;
