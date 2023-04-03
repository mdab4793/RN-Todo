import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    accessToken: null,
    username: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.accessToken = action.payload.token;
      state.username = action.payload.username;
      state.error = null;
    },
    loginFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.accessToken = null;
      state.username = null;
    },
  },
});
export const { loginStart, loginSuccess, loginFail, logout } =
  authSlice.actions;

export default authSlice;
