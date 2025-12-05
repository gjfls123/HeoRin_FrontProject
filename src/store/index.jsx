import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../slice/cartSlice";
import authSlice from "./../slice/authSlice";
import paymentSlice from "./../slice/paymentSlice";

const index = configureStore({
  reducer: {
    cart: cartSlice,
    auth: authSlice,
    payment: paymentSlice
  },
});

export default index;
