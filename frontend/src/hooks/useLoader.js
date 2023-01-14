import { useState } from "react";

const useLoader = (active = true) => {
  const [loaderActive, setLoaderActive] = useState(active);

  return { loaderActive, setLoaderActive };
};

export default useLoader;
