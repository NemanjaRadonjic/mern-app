import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as id } from "uuid";
import axiosInstance from "@axios";

import Post from "@components/elements/Post";

const VotedPosts = (props) => {
  const user = useSelector((state) => state.user);
  const { username } = props.match.params;
  const [votedPosts, setVotedPosts] = useState(null);
  const url =
    props.type === "liked"
      ? `/users/${username}/posts/liked`
      : `/users/${username}/posts/disliked`;
  useEffect(() => {
    const fetchVotedPostsByUser = async () => {
      const response = await axiosInstance.get(url);
      setVotedPosts(response.data.reverse());
    };
    fetchVotedPostsByUser();
  }, []);
  console.log(votedPosts);
  return (
    votedPosts &&
    votedPosts.map((post) => {
      return <Post key={id()} post={post} user={user} />;
    })
  );
};

export default VotedPosts;
