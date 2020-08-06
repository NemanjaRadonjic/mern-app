import React, { useState, useEffect } from "react";
import { v4 as id } from "uuid";

import axios from "@axios";
import Post from "@components/elements/Post";

import { Container, Posts } from "./styles";
import NewPost from "./NewPost";

function Home() {
  const [posts, setPosts] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("/posts");
      setPosts(response.data.reverse());
    };
    fetchPosts();
  }, [shouldUpdate]);

  const renderPosts = posts.map((post) => {
    return <Post key={id()} post={post} />;
  });

  return (
    <Container>
      <NewPost shouldUpdate={shouldUpdate} setShouldUpdate={setShouldUpdate} />
      <Posts>{renderPosts}</Posts>
    </Container>
  );
}

export default Home;
