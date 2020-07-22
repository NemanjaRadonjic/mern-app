import { useState } from "react";

const useFormHook = (fields) => {
  const [inputs, setInputs] = useState({ ...fields });

  const [errors, setErrors] = useState({ ...fields });

  const onChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  return { inputs, onChange, setInputs, errors, setErrors, fields };
};

export default useFormHook;
