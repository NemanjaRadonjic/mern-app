import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Post from "@components/elements/Post";
import NewPost from "./NewPost";
import axiosInstance from "@axios";
import { Container, Posts } from "./styles";
import { NoContentMessage, Loader } from "@styles/common";
import InfiniteScroll from "react-infinite-scroll-component";

const numberOfPostsToDisplay = 10;

function Home() {
  const user = useSelector((state) => state.user);
  const [posts, setPosts] = useState(null);
  const [loaderActive, setLoaderActive] = useState(true);
  const [numOfPosts, setNumOfPosts] = useState(numberOfPostsToDisplay);
  const fetchPosts = async () => {
    setNumOfPosts(numOfPosts + numberOfPostsToDisplay);
    const response = await axiosInstance.get("/posts", {
      params: { amount: numOfPosts },
    });
    if (response.data.length === 0) {
      setLoaderActive(false);
    }
    if (!posts) {
      response && setPosts([...response.data.reverse()]);
    } else {
      response && setPosts([...posts, ...response.data.reverse()]);
    }
  };
  useEffect(() => {
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
      <Posts>
        <InfiniteScroll
          style={{ overflow: "hidden" }}
          dataLength={posts?.length || 0}
          next={fetchPosts}
          hasMore={loaderActive}
          loader={<Loader />}
        >
          {posts && renderPosts()}
        </InfiniteScroll>
      </Posts>
    </Container>
  );
}

export default Home;
