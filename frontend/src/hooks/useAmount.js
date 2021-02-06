import { useState } from "react";

const postsPerFetch = 10;

const useAmount = () => {
  const [amountOfPosts, setAmountOfPosts] = useState(postsPerFetch);

  return { amountOfPosts, setAmountOfPosts, postsPerFetch };
};

export default useAmount;
