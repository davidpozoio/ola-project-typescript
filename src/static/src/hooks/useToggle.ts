import { useState } from "react";

const useToggle = (initialValue: boolean = false) => {
  const [value, setToggle] = useState(initialValue);

  const setTrue = () => {
    setToggle(true);
  };

  const setFalse = () => {
    setToggle(false);
  };

  const toggle = () => {
    setToggle((value) => !value);
  };

  return {
    value,
    setTrue,
    setFalse,
    toggle,
  };
};

export default useToggle;
