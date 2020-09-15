import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Post from "@components/elements/Post";
import NewPost from "./NewPost";
import axiosInstance from "@axios";
import { Container, Posts } from "./styles";
import { NoContentMessage, Loader } from "@styles/common";

function Home() {
  const user = useSelector((state) => state.user);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axiosInstance.get("/posts");
      response && setPosts(response.data.reverse());
    };
    fetchPosts();
  }, []);

  const renderPosts = () => {
    return posts?.length > 0 ? (
      posts.map((post) => {
        return (
          <Post
            key={post._id}
            post={post}
            user={user}
            posts={posts}
            setPosts={setPosts}
          />
        );
      })
    ) : (
      <NoContentMessage>No one made any posts yet :(</NoContentMessage>
    );
  };

  return (
    <Container>
      <NewPost posts={posts} setPosts={setPosts} />
      <Posts>{posts ? renderPosts() : <Loader />}</Posts>
    </Container>
  );
}

export default Home;
