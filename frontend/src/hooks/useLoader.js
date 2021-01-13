import { useState } from "react";

const useAmount = () => {
  const [loaderActive, setLoaderActive] = useState(true);

  return { loaderActive, setLoaderActive };
};

export default useAmount;
