export const setCurrentUser = (payload) => {
  return {
    type: "SET_CURRENT_USER",
    payload,
  };
};
export const logoutUser = () => {
  return {
    type: "LOGOUT_USER",
  };
};
