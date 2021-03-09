import { useState } from "react";

const useAmount = (active = true) => {
  const [loaderActive, setLoaderActive] = useState(active);

  return { loaderActive, setLoaderActive };
};

export default useAmount;
