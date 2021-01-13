import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as id } from "uuid";
import axiosInstance from "@axios";
import useAmount from "@hooks/useAmount";
import useLoader from "@hooks/useLoader";
import InfiniteScroll from "react-infinite-scroll-component";

import Post from "@components/elements/Post";
import { NoContentMessage, Loader } from "@styles/common";

const VotedPosts = (props) => {
  const user = useSelector((state) => state.user);
  const { username } = props.match.params;
  const [votedPosts, setVotedPosts] = useState(null);
  const { loaderActive, setLoaderActive } = useLoader();
  const { amountOfPosts, setAmountOfPosts, postsPerFetch } = useAmount();

  const fetchVotedPostsByUser = async () => {
    setAmountOfPosts(amountOfPosts + postsPerFetch);
    const response = await axiosInstance.get(
      `/users/${username}/posts/${props.type}`,
      {
        params: { amount: amountOfPosts, postsPerFetch },
      }
    );
    if (response.data.length === 0) {
      setLoaderActive(false);
    }
    if (!votedPosts) {
      response && setVotedPosts([...response.data.reverse()]);
    } else {
      response && setVotedPosts([...votedPosts, ...response.data.reverse()]);
    }
  };

  useEffect(() => {
    fetchVotedPostsByUser();
  }, []);

  const renderPosts = () => {
    return votedPosts.length > 0 ? (
      votedPosts.map((post) => {
        return (
          <Post
            key={post._id}
            post={post}
            user={user}
            posts={votedPosts}
            setPosts={setVotedPosts}
          />
        );
      })
    ) : (
      <NoContentMessage>
        User didn't {props.type.slice(0, -1)} any posts yet.
      </NoContentMessage>
    );
  };

  return (
    <InfiniteScroll
      style={{ overflow: "hidden", minHeight: "100vh" }}
      dataLength={votedPosts?.length || 0}
      next={fetchVotedPostsByUser}
      hasMore={loaderActive}
      loader={<Loader />}
    >
      {votedPosts && renderPosts()}
    </InfiniteScroll>
  );
};

export default VotedPosts;
