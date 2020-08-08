import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { v4 as id } from "uuid";

import axios from "@axios";
import Post from "@components/elements/Post";

import { Container, Posts } from "./styles";
import NewPost from "./NewPost";

function Home() {
  const user = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  useEffect(() => {
    const fetchPosts = async (url) => {
      const response = await axios.get(url);
      setPosts(response.data.reverse());
    };
    if (user) {
      fetchPosts(`/posts/user/${user.id}`);
    } else {
      fetchPosts("/posts");
    }
  }, [shouldUpdate, user]);

  const renderPosts = posts.map((post) => {
    return <Post key={id()} post={post} user={user} />;
  });

  return (
    <Container>
      <NewPost shouldUpdate={shouldUpdate} setShouldUpdate={setShouldUpdate} />
      <Posts>{renderPosts}</Posts>
    </Container>
  );
}

export default Home;
