import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("jwt") || null,
  isAuthenticated: !!localStorage.getItem("jwt"),
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    token: localStorage.getItem("jwt"),
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.jwt;
      state.user = action.payload.user;
      localStorage.setItem("jwt", action.payload.jwt);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
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
