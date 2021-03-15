import React, { useState, useEffect, useRef, useContext } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "@axios";
import moment from "moment";
import { toast } from "react-toastify";
import ThemeContext from "@context/theme";

import getImageSrc from "@helpers/imageSrc";

import EditComment from "./edit";

import { CommentContent } from "./styles";
import { Avatar } from "../../ui/routes/Home/NewPost/styles";
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
  VoteButton,
  RemoveButton,
  Message,
  ButtonContainer,
  RemoveModal,
  Count,
  Settings,
  Setting,
} from "../common/styles";

const Comment = ({ comment, history, comments, setComments }) => {
  const {
    themeInfo: { mode },
  } = useContext(ThemeContext);
  const user = useSelector((state) => state.user);
  const authorSelf = comment.author?.username == user?.username;
  const convertedDate = moment(comment.createdAt, "MM/DD/YYYY, h:mm:ss A");

  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const commentRef = useRef();
  const [commentHeight, setCommentHeight] = useState();

  const [votes, setVotes] = useState({
    likes: comment.votes.likes.length,
    dislikes: comment.votes.dislikes.length,
    liked: comment.votes.likes.includes(user?.id),
    disliked: comment.votes.dislikes.includes(user?.id),
  });
  const background = `http://localhost:4000/uploads/${
    comment.author.background?.split("\\")[1]
  }`;

  useEffect(() => {
    setCommentHeight(commentRef.current.offsetHeight);
  }, []);

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

  const toggleEditModal = (event) => {
    event.stopPropagation();
    setEditModal(!editModal);
  };

  const toggleRemoveModal = (event) => {
    event.stopPropagation();
    setDeleteModal(!deleteModal);
  };

  const handleEdit = async (newContent) => {
    if (newContent.length > 0) {
      const { data } = await axiosInstance.patch(
        `/comments/${comment._id}/edit`,
        {
          newContent,
        }
      );
      comment.content = data.newContent;
      setEditModal(false);
      toast("Comment has been updated.");
    }
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
      <Background mode={mode}>
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
          {editModal ? (
            <EditComment
              commentHeight={commentHeight}
              content={comment.content}
              id={comment._id}
              handleEdit={handleEdit}
            />
          ) : (
            <CommentContent>
              <p ref={commentRef}>{comment.content}</p>
            </CommentContent>
          )}
          <VoteContainer>
            <ItemContainer>
              <VoteButton
                name="like"
                onClick={like}
                className={`fa${votes.liked ? "s" : "r"} fa-thumbs-up`}
              />
              <Count>{votes.likes}</Count>
            </ItemContainer>
            <ItemContainer>
              <VoteButton
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
          <Setting onClick={toggleEditModal} className="fas fa-edit" />
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
