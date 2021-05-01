import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useAmount from "@hooks/useAmount";
import useLoader from "@hooks/useLoader";

import Post from "@components/elements/Post";
import NewPost from "./NewPost";
import axiosInstance from "@axios";
import { Container, Posts } from "./styles";
import { NoContentMessage, Loader } from "@styles/common";
import InfiniteScroll from "react-infinite-scroll-component";

function Home() {
  const user = useSelector((state) => state.user);
  const [posts, setPosts] = useState(null);
  const { loaderActive, setLoaderActive } = useLoader();

  const { amountOfPosts, setAmountOfPosts, postsPerFetch } = useAmount();

  const fetchPosts = async () => {
    setAmountOfPosts(amountOfPosts + postsPerFetch);
    const response = await axiosInstance.get("/posts", {
      params: { amount: amountOfPosts, postsPerFetch },
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
    return (
      posts.length > 0 &&
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
          {posts && posts.length === 0 && (
            <NoContentMessage>No one made any posts yet :(</NoContentMessage>
          )}
        </InfiniteScroll>
      </Posts>
    </Container>
  );
}

export default Home;
