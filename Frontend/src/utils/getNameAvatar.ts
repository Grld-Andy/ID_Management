const getNameAvatar = (name: string | undefined) => {
  if (!name) return "";
  const fullName = name.split(" ");
  const titlizedName = fullName.map((name) => name.charAt(0).toUpperCase());
  const userAvatar = titlizedName.join("");
  return userAvatar;
};

export default getNameAvatar;
