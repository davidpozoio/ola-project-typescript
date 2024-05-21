const delay = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time * 1000));
};

export default delay;
