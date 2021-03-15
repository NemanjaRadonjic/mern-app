import React, { useState, useEffect } from "react";
import axiosInstance from "@axios";

import PostComponent from "@components/elements/Post";
import CommentComponent from "@components/elements/Comment";

import { Container, CommentSection } from "./styles";
import { NoContentMessage, Loader } from "@styles/common";
import NewComment from "../../../elements/NewComment";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import NotFound from "@routes/NotFound"; // routes/NotFound ?

const Post = (props) => {
  const user = useSelector((state) => state.user);
  const { postId } = props.match.params;
  const [post, setPost] = useState(props.location.post);
  const [comments, setComments] = useState(null);
  const [newCommentModal, setNewCommentModal] = useState(
    props.location.isCommentActive
  );

  const fetchPost = async () => {
    try {
      const response = await axiosInstance.get(`/posts/${postId}`);
      setPost(response.data);
    } catch (error) {
      if (error.response.status === 404) {
        setPost(null);
      }
    }
  };
  const fetchComments = async () => {
    const response = await axiosInstance.get(`/posts/${postId}/comments`);
    setComments(response.data.reverse());
  };

  useEffect(() => {
    !post && fetchPost();
    post && fetchComments();
  }, [post]);

  const toggleNewCommentModal = () => {
    user
      ? setNewCommentModal(!newCommentModal)
      : toast.error("You have to log in to comment");
  };

  const renderComments = () => {
    return (
      comments &&
      comments.map((comment) => {
        return (
          <CommentComponent
            key={comment._id}
            comment={comment}
            comments={comments}
            setComments={setComments}
          />
        );
      })
    );
  };
  if (post === null) {
    return <NotFound />;
  }
  if (post) {
    return (
      <Container>
        <PostComponent
          post={post}
          comments={comments}
          toggleNewCommentModal={toggleNewCommentModal}
          newCommentModal={newCommentModal}
        />
        {newCommentModal && (
          <NewComment
            user={user}
            postId={post._id}
            comments={comments}
            setComments={setComments}
            toggleNewCommentModal={toggleNewCommentModal}
          />
        )}
        <CommentSection>
          {comments === null ? (
            <Loader />
          ) : comments.length > 0 ? (
            renderComments()
          ) : (
            <NoContentMessage>No one made any comments yet :(</NoContentMessage>
          )}
        </CommentSection>
      </Container>
    );
  }
  return <Loader />;
};

export default Post;
