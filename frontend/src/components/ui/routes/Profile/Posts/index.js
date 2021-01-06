import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as id } from "uuid";
import axiosInstance from "@axios";

import Post from "@components/elements/Post";

import { NoContentMessage, Loader } from "@styles/common";

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

  const renderPosts = () => {
    return userPosts.length > 0 ? (
      userPosts.map((post) => {
        return (
          <Post
            key={post._id}
            post={post}
            user={user}
            posts={userPosts}
            setPosts={setUserPosts}
          />
        );
      })
    ) : (
      <NoContentMessage>User didn't made any posts yet :(</NoContentMessage>
    );
  };

  return userPosts ? renderPosts() : <Loader />;
};

export default Posts;
