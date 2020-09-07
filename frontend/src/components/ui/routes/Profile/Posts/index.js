import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as id } from "uuid";
import axiosInstance from "@axios";

import Post from "@components/elements/Post";

const Posts = (props) => {
  const user = useSelector((state) => state.user);
  const { username } = props.match.params;
  const [userPosts, setUserPosts] = useState(null);

  useEffect(() => {
    const fetchUserPosts = async () => {
      const response = await axiosInstance.get(`/users/${username}/posts`);
      setUserPosts(response.data.reverse());
    };
    fetchUserPosts();
  }, []);

  return (
    userPosts &&
    userPosts.map((post) => {
      return <Post key={id()} post={post} user={user} />;
    })
  );
};

export default Posts;
