import { useState } from "react";

function useFormHook(fields) {
  const [inputs, setInputs] = useState({ ...fields });

  return { inputs, setInputs };
}

export default useFormHook;
