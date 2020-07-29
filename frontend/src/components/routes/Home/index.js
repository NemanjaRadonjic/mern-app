import React, { useState, useEffect } from "react";
import { v4 as id } from "uuid";
import moment from "moment";

import axios from "@axios";
import {
  Container,
  PostContainer,
  PostHead,
  PostInfo,
  PostContent,
  Title,
  Author,
  Date,
} from "./styles";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("/posts");
      setPosts(response.data);
    };
    fetchPosts();
  }, []);

  const renderPosts = posts.map((post) => {
    const createdAt = moment(post.createdAt, "MM/DD/YYYY, h:mm:ss A");
    return (
      <PostContainer key={id()}>
        <PostHead>
          <Title>{post.title}</Title>
          <PostInfo>
            <Author>{post.author.username}</Author>
            <Date>{createdAt.fromNow()}</Date>
          </PostInfo>
        </PostHead>
        <PostContent>{post.content}</PostContent>
      </PostContainer>
    );
  });

  return <Container>{renderPosts}</Container>;
}

export default Home;
