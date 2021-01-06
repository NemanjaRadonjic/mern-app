import React, { useState, useEffect } from "react";
import moment from "moment";
import axiosInstance from "@axios";

import PostComponent from "@components/elements/Post";
import CommentComponent from "@components/elements/Comment";

import { Container, CommentSection } from "./styles";
import { NoContentMessage, Loader } from "@styles/common";
import NewComment from "../../../elements/NewComment";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Post = (props) => {
  const user = useSelector((state) => state.user);
  const { postId } = props.match.params;
  const [post, setPost] = useState(props.location.post);
  const [comments, setComments] = useState(null);
  const [newCommentActive, setNewCommentActive] = useState(false);
  useEffect(() => {
    const fetchPost = async () => {
      const response = await axiosInstance.get(`/posts/${postId}`);
      setPost({
        ...response.data,
        createdAt: moment(response.data.createdAt, "MM/DD/YYYY, h:mm:ss A"),
      });
    };
    const fetchComments = async () => {
      const response = await axiosInstance.get(`/posts/${postId}/comments`);
      setComments(response.data.reverse());
    };
    !post && fetchPost();
    fetchComments();
  }, []);

  const toggleNewCommentActive = () => {
    user
      ? setNewCommentActive(!newCommentActive)
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

  if (post) {
    return (
      <Container>
        <PostComponent
          post={post}
          comments={comments}
          toggleNewCommentActive={toggleNewCommentActive}
          newCommentActive={newCommentActive}
        />
        {newCommentActive && (
          <NewComment
            user={user}
            postId={post._id}
            comments={comments}
            setComments={setComments}
            toggleNewCommentActive={toggleNewCommentActive}
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
