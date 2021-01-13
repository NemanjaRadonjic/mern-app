// this hook is for keeping track of the amount of posts to be fetched

import { useState } from "react";

const postsPerFetch = 10;

const useAmount = () => {
  const [amountOfPosts, setAmountOfPosts] = useState(postsPerFetch);

  return { amountOfPosts, setAmountOfPosts, postsPerFetch };
};

export default useAmount;
