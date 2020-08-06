import React from "react";
import axios from "@axios";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment";

import {
  PostContainer,
  PostHead,
  PostInfo,
  PostContent,
  Author,
  Date,
} from "./styles";
import { Avatar } from "../../ui/routes/Home/NewPost/styles";

const Post = ({ post, history }) => {
  const userId = useSelector((state) => state.user.id);
  post.createdAt = moment(post.createdAt, "MM/DD/YYYY, h:mm:ss A");

  const vote = async (event) => {
    event.stopPropagation();
    try {
      await axios.post(`/posts/${post._id}/vote`, {
        type: event.target.name,
        userId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const postModal = () => {
    history.push({
      pathname: `/posts/${post._id}`,
      post,
    });
  };

  return (
    <PostContainer onClick={postModal}>
      <Avatar src="https://www.nlg.nhs.uk/content/uploads/2016/04/man.jpg" />
      <PostHead>
        <PostInfo>
          <Author>{post.author.username}</Author>
          <Date>{post.createdAt.fromNow()}</Date>
        </PostInfo>
        <PostContent>
          <p>{post.content}</p>
        </PostContent>
        <div>
          <div>
            Likes: {post.votes.likes.length}
            <button name="like" onClick={vote}>
              Like
            </button>
          </div>
          <div>
            Dislikes: {post.votes.dislikes.length}
            <button name="dislike" onClick={vote}>
              Dislike
            </button>
          </div>
        </div>
      </PostHead>
    </PostContainer>
  );
};

export default withRouter(Post);
