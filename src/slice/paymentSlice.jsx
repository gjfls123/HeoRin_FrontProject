import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const initState = {
  payment: [],
  paymentData: [],
};

const paymentSlice = createSlice({
  name: "payment",
  initialState: initState,
  reducers: {
    addPayment: (state, action) => {
      const num = state.paymentData.findIndex((el) => {
        return el.id === action.payload.id;
      });

      if (num === -1) {
        state.paymentData.push(action.payload);
      } else {
        state.paymentData[num] = action.payload;
      }
    },

    paymentDirect: (state, action) => {
      const num = state.payment.findIndex((el) => {
        return el.id === action.payload.id;
      });

      if (num === -1) {
        state.payment.push(action.payload);
      } else {
        state.payment = [];
      }
    },

    paymentDeleteFn: (state) => {
      state.payment = [];
    },
  },
});

export const { addPayment, paymentDirect, paymentDeleteFn } =
  paymentSlice.actions;
export default paymentSlice.reducer;
