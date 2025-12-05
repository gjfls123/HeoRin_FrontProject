import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const initstate = {
  islogin: false,
  user: [],
  loginUser: [],
};
const authSlice = createSlice({
  name: "auth",
  initialState: initstate,
  reducers: {
    loginUserFn: (state, action) => {
      const num = state.loginUser.findIndex((el) => {
        return el.userEmail === action.payload.userEmail;
      });
      if (num === -1) {
        state.loginUser.push(action.payload);
        state.islogin = true;
      }
    },

    addUser: (state, action) => {
      state.user.push(action.payload);
    },

    logoutUserFn: (state, action) => {
      state.islogin = false;
      state.loginUser.splice(0, 1);
    },
  },
});

export default authSlice.reducer;
export const { loginUserFn, logoutUserFn, addUser } = authSlice.actions;
