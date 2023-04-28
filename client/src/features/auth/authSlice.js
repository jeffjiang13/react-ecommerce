import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("jwt") || null,
  isAuthenticated: !!localStorage.getItem("jwt"),
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log("Login action:", action);
      const { user, token } = action.payload;
      if (token) {
        state.user = user;
        state.token = token;
        state.isAuthenticated = true;
        localStorage.setItem("jwt", token);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("jwt");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUserFromStorage, (state, action) => {
      const { jwt, user } = action.payload;
      state.jwt = jwt;
      state.user = user;
      state.isAuthenticated = true;
    });
  },
});

export const { login, logout } = authSlice.actions;

// Add the new action
export const loadUserFromStorage = createAction("auth/loadUserFromStorage");

export default authSlice.reducer;
