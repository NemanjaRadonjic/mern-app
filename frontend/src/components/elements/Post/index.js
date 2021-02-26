import React, { useState, useRef, useEffect } from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import getImageSrc from "@helpers/imageSrc";
import EditPost from "./edit";
import axiosInstance from "@axios";
import { useSelector } from "react-redux";

import { PostContent } from "./styles";
import { Avatar } from "../../ui/routes/Home/NewPost/styles";
import {
  Container,
  Background,
  Author,
  Info,
  Head,
  Time,
  VoteContainer,
  ItemContainer,
  VoteButton,
  RemoveButton,
  Count,
  Settings,
  Setting,
  RemoveModal,
  Message,
  ButtonContainer,
} from "../common/styles";

const Post = ({
  post,
  history,
  location,
  commentActive,
  posts,
  setPosts,
  comments,
  toggleNewCommentActive,
  newCommentActive,
}) => {
  const postRef = useRef();
  const postCopy = location.post;
  console.log("postCopy: ", postCopy);
  const user = useSelector((state) => state.user);
  const authorSelf = post.author.username == user?.username;
  const accessToken = JSON.parse(window.localStorage.getItem("accessToken"));
  axiosInstance.defaults.headers.authorization = "Bearer " + accessToken;
  post.createdAt = moment(post.createdAt, "MM/DD/YYYY, h:mm:ss A");
  const [postHeight, setPostHeight] = useState();

  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  console.log(post);
  const [votes, setVotes] = useState({
    likes: postCopy ? postCopy.votes.likes : post.votes.likes,
    dislikes: postCopy ? postCopy.votes.dislikes : post.votes.dislikes,
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

  useEffect(() => {
    setPostHeight(postRef.current.offsetHeight);
  }, []);

  const handleEdit = async (newContent) => {
    if (newContent.length > 0) {
      const { data } = await axiosInstance.patch(`/posts/${post._id}/edit`, {
        newContent,
      });
      post.content = data.newContent;
      setEditModal(false);
      toast("Post has been updated.");
    }
  };

  const like = async (event) => {
    event.stopPropagation();
    if (user) {
      try {
        const response = await axiosInstance.post(`/posts/${post._id}/like`, {
          userId: user.id,
        });

        const { liked, disliked } = response.data;
        let updatedVotes = { ...votes, liked, disliked };

        if (votes.liked) {
          updatedVotes.likes = updatedVotes.likes.filter((id) => id != user.id);
        } else {
          if (votes.disliked) {
            updatedVotes.dislikes = updatedVotes.dislikes.filter(
              (id) => id != user.id
            );
            updatedVotes.likes.push(user.id);
          } else {
            updatedVotes.likes.push(user.id);
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
      try {
        const response = await axiosInstance.post(
          `/posts/${post._id}/dislike`,
          {
            userId: user.id,
          }
        );

        const { liked, disliked } = response.data;
        let updatedVotes = { ...votes, liked, disliked };

        if (votes.disliked) {
          updatedVotes.dislikes = updatedVotes.dislikes.filter(
            (id) => id != user.id
          );
        } else {
          if (votes.liked) {
            updatedVotes.likes = updatedVotes.likes.filter(
              (id) => id != user.id
            );
            updatedVotes.dislikes.push(user.id);
          } else {
            updatedVotes.dislikes.push(user.id);
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

  const toggleEditModal = (event) => {
    event.stopPropagation();
    setEditModal(!editModal);
  };

  const toggleRemoveModal = (event) => {
    event.stopPropagation();
    setDeleteModal(!deleteModal);
  };
  const handleClickRemove = async (event) => {
    event.stopPropagation();
    try {
      await axiosInstance.delete(`/posts/${post._id}/remove`);
      setPosts(posts.filter((p) => p._id != post._id));
      toast.error("The post is removed");
    } catch (error) {
      console.log(error);
    }
    history.push("/home");
  };

  const updatedPost = { ...post, votes };

  const redirectToPost = (event) => {
    history.push({
      pathname: `/posts/${post._id}`,
      post: updatedPost,
    });
  };

  const redirectToProfile = (event) => {
    event.stopPropagation();
    history.push(`/user/${post.author.username}`);
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
          {editModal ? (
            <EditPost
              postHeight={postHeight}
              content={post.content}
              id={post._id}
              handleEdit={handleEdit}
            />
          ) : (
            <PostContent>
              <p ref={postRef}>{post.content}</p>
            </PostContent>
          )}

          <VoteContainer>
            <ItemContainer>
              <VoteButton
                className={`fa${newCommentActive ? "s" : "r"} fa-comment`}
                onClick={toggleNewCommentActive}
              />
              <Count>
                {comments?.length === undefined
                  ? post.comments
                  : comments.length}
              </Count>
            </ItemContainer>
            <ItemContainer>
              <VoteButton
                onClick={like}
                className={`fa${votes.liked ? "s" : "r"} fa-thumbs-up`}
              />
              <Count>{votes.likes.length}</Count>
            </ItemContainer>
            <ItemContainer>
              <VoteButton
                onClick={dislike}
                className={`fa${votes.disliked ? "s" : "r"} fa-thumbs-down`}
              />
              <Count>{votes.dislikes.length}</Count>
            </ItemContainer>
          </VoteContainer>
        </Head>
      </Background>
      {authorSelf && (
        <Settings>
          <Setting onClick={toggleEditModal} className="fas fa-edit" />
          <Setting onClick={toggleRemoveModal} className="fas fa-trash-alt" />
        </Settings>
      )}
      {deleteModal && (
        <RemoveModal>
          <Message>Are you sure you want to delete this post ?</Message>
          <ButtonContainer>
            <RemoveButton onClick={toggleRemoveModal}>No</RemoveButton>
            <RemoveButton onClick={handleClickRemove}>Yes</RemoveButton>
          </ButtonContainer>
        </RemoveModal>
      )}
    </Container>
  );
};

export default withRouter(Post);
