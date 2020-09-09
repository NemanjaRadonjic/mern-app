import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as id } from "uuid";
import axiosInstance from "@axios";

import Post from "@components/elements/Post";
import { NoContentMessage, Loader } from "@styles/common";

const VotedPosts = (props) => {
  const user = useSelector((state) => state.user);
  const { username } = props.match.params;
  const [votedPosts, setVotedPosts] = useState(null);

  useEffect(() => {
    const fetchVotedPostsByUser = async () => {
      const response = await axiosInstance.get(
        `/users/${username}/posts/${props.type}`
      );
      setVotedPosts(response.data.reverse());
    };
    fetchVotedPostsByUser();
  }, []);

  const renderPosts = () => {
    return votedPosts.length > 0 ? (
      votedPosts.map((post) => {
        return <Post key={id()} post={post} user={user} />;
      })
    ) : (
      <NoContentMessage>
        User didn't {props.type.slice(0, -1)} any posts yet.
      </NoContentMessage>
    );
  };
  return votedPosts ? renderPosts() : <Loader />;
};

export default VotedPosts;
