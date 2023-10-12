export const checkExistingUser = (users, email) => {
  const existingUser = users.find((user) => user.email === email);
  return existingUser
    ? console.log("user already exist", email)
    : console.log("new user");
};
