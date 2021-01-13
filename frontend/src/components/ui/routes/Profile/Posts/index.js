import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAmount from "@hooks/useAmount";
import useLoader from "@hooks/useLoader";
import InfiniteScroll from "react-infinite-scroll-component";
import axiosInstance from "@axios";

import Post from "@components/elements/Post";

import { NoContentMessage, Loader } from "@styles/common";

const Posts = (props) => {
  const user = useSelector((state) => state.user);
  const { username } = props.match.params;
  const [userPosts, setUserPosts] = useState(null);
  const { loaderActive, setLoaderActive } = useLoader();
  const { amountOfPosts, setAmountOfPosts, postsPerFetch } = useAmount();

  const fetchUserPosts = async () => {
    console.log("fetching...");
    console.log(amountOfPosts);
    setAmountOfPosts(amountOfPosts + postsPerFetch);
    const response = await axiosInstance.get(`/users/${username}/posts`, {
      params: { amount: amountOfPosts, postsPerFetch },
    });

    if (response.data.length === 0) {
      setLoaderActive(false);
    }
    response &&
      setUserPosts([...(userPosts || []), ...response.data.reverse()]);
    // if (!userPosts) {
    //   console.log("no posts");
    //   response && setUserPosts([...response.data.reverse()]);
    // } else {
    //   console.log("yes posts");
    //   response && setUserPosts([...userPosts, ...response.data.reverse()]);
    // }
  };

  useEffect(() => {
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

  return (
    <InfiniteScroll
      style={{ overflow: "hidden", minHeight: "100vh" }}
      dataLength={userPosts?.length || 0}
      next={fetchUserPosts}
      hasMore={loaderActive}
      loader={<Loader />}
    >
      {userPosts && renderPosts()}
    </InfiniteScroll>
  );
};

export default Posts;
