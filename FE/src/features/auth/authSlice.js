import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: sessionStorage.getItem("token"),
  user: sessionStorage.getItem("user"),
  isAuthenticated: !!sessionStorage.getItem("token"),
  role: sessionStorage.getItem("role"),
  userId: sessionStorage.getItem("userID"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      sessionStorage.setItem("token", action.payload.token);
    },
    setLogin: (state, action) => {
      state.user = action.payload.username;
      sessionStorage.setItem("user", action.payload.username);
      state.role = action.payload.role;
      sessionStorage.setItem("role", action.payload.role);
      state.userId = action.payload.userID;
      sessionStorage.setItem("userID", action.payload.userID);
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = sessionStorage.removeItem("token");
      state.user = sessionStorage.removeItem("user");
      state.role = sessionStorage.removeItem("role");
      state.userId = sessionStorage.removeItem("userID");
      state.isAuthenticated = false;
    },
  },
});

export const { setToken, setLogin, logout } = authSlice.actions;

export default authSlice.reducer;
