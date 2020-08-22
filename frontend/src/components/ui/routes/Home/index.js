import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { v4 as id } from "uuid";

import axios from "@axios";
import Post from "@components/elements/Post";

import { Container, Posts } from "./styles";
import NewPost from "./NewPost";
import axiosInstance from "@axios";

function Home() {
  const user = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async (url, options) => {
      const response = await axios.get(url, options);
      if (response) {
        setPosts(response.data.reverse());
      }
    };
    if (user) {
      const accessToken = JSON.parse(
        window.localStorage.getItem("accessToken")
      );
      axiosInstance.defaults.headers.authorization = "Bearer " + accessToken;

      fetchPosts(`/posts/user/${user.id}`);
    } else {
      fetchPosts("/posts");
    }
  }, [user]);

  const renderPosts = posts.map((post) => {
    return <Post key={id()} post={post} user={user} />;
  });

  return (
    <Container>
      <NewPost posts={posts} setPosts={setPosts} />
      <Posts>{renderPosts}</Posts>
    </Container>
  );
}

export default Home;
