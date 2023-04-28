// utils.js
import { loadUserFromStorage } from "./auth/authSlice";

export const checkAndLoadUserFromStorage = (dispatch) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(loadUserFromStorage({ token, user }));
    }
  }
};
