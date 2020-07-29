import React, { useState, useEffect } from "react";
import { v4 as id } from "uuid";
import moment from "moment";

import axios from "@axios";
import { Container, PostContainer } from "./styles";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log(Date.now());
    const createdAt = moment("7/29/2020 | 3:42AM", "M/DD/YYYY | h:mmA");
    console.log(createdAt.fromNow());
    const fetchPosts = async () => {
      const response = await axios.get("/posts");
      setPosts(response.data);
    };
    fetchPosts();
  }, []);

  const renderPosts = posts.map((post) => (
    <PostContainer key={id()}>
      {console.log(post)}
      <div>Author: {post.author.username}</div>
      <div>Title: {post.title}</div>
      <div>Content: {post.content}</div>
    </PostContainer>
  ));

  return <Container>{renderPosts}</Container>;
}

export default Home;
