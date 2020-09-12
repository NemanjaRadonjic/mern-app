import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import moment from "moment";
import axios from "@axios";

import PostComponent from "@components/elements/Post";
import NewComment from "./NewComment";

const Comment = (props) => {
  const user = useSelector((state) => state.user);
  const { postId } = props.match.params;
  const [post, setPost] = useState(props.location.post);
  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(`/posts/${postId}`);
      setPost({
        ...response.data,
        createdAt: moment(response.data.createdAt, "MM/DD/YYYY, h:mm:ss A"),
      });
    };
    !post && fetchPost();
  }, []);
  if (post) {
    return (
      <>
        <PostComponent post={post} />
        <NewComment
          avatar={user.avatar}
          postId={postId}
          userId={user.id}
          history={props.history}
        />
      </>
    );
  }
  return null;
};

export default Comment;
