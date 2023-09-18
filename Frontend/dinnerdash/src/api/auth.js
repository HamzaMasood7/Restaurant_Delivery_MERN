export const getToken = () => {
  const userJSON = localStorage.getItem("user");
  const user = JSON.parse(userJSON);
  const token = user.token;
  return token;
};
