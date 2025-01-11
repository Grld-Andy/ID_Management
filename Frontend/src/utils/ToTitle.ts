const toTitle = (word: string) => {
  const title = word.slice(0, 1).toLocaleUpperCase();
  word = title + word.slice(1);
  return word;
};

export default toTitle;
