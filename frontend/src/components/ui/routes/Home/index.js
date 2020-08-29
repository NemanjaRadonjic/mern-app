import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { v4 as id } from "uuid";
import Post from "@components/elements/Post";

import { Container, Posts } from "./styles";
import NewPost from "./NewPost";
import axiosInstance from "@axios";

function Home() {
  const user = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axiosInstance.get("/posts");
      response && setPosts(response.data.reverse());
    };
    fetchPosts();
  }, []);

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
