import { useState } from "react";

function useFormHook(fields) {
  const [inputs, setInputs] = useState({ ...fields });

  const onChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  return { inputs, onChange, setInputs };
}

export default useFormHook;
