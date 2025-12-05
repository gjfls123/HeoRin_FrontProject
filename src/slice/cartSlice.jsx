import { createSlice } from "@reduxjs/toolkit";
import React, { act } from "react";

const initState = {
  items: [],
  checkItem: [],
  receive: "deliveryOK",
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: initState,
  reducers: {
    addCart: (state, action) => {
      const num = state.items.findIndex((el) => {
        return el.id === action.payload.id && el.name === action.payload.name;
      });
      if (num === -1) {
        state.items.push(action.payload);
      } else {
        state.items[num].count += action.payload.count;
      }
    },

    PlusFn: (state, action) => {
      const itemId = action.payload.id;
      const num = state.items.findIndex((el) => {
        return el.id === itemId;
      });
      if (num !== -1) {
        state.items[num].count++;
        if (!state.checkItem[num]) {
          return;
        } else {
          state.checkItem[num].count++;
        }
      }
    },

    MinusFn: (state, action) => {
      const num = state.items.findIndex((el) => {
        return el.id === action.payload.id;
      });

      if (num !== -1) {
        if (state.items[num].count <= 1) {
          state.items[num].count = 1;
        } else {
          state.items[num].count--;
          if (!state.checkItem[num]) {
            return;
          } else {
            state.checkItem[num].count--;
          }
        }
      }
    },

    DeleteFn: (state, action) => {
      const isDelete = action.payload.id;

      if (!isDelete) {
        alert("삭제할 상품이 없습니다.");
      }
      state.items = state.items.filter((el) => el.id !== isDelete);
      state.checkItem = state.checkItem.filter((el) => el.id !== isDelete);
    },

    ResetFn: (state) => {
      state.items = [];
      state.checkItem = [];
    },

    checkedChange: (state, action) => {
      const num = state.items.findIndex((el) => {
        return el.id === action.payload;
      });

      const targetItem = state.items[num];
      targetItem.isChecked = !targetItem.isChecked;

      const exists = state.checkItem.some((el) => el.id === targetItem.id);

      if (targetItem.isChecked) {
        if (!exists) {
          state.checkItem.push(targetItem);
        }
      } else {
        state.checkItem = state.checkItem.filter(
          (el) => el.id !== targetItem.id
        );
      }
    },

    allChecked: (state, action) => {
      const isChecked = action.payload;
      state.items.forEach((el) => {
        return (el.isChecked = isChecked);
      });

      if (isChecked) {
        state.checkItem = state.items.map((el) => el);
      } else {
        state.checkItem = [];
      }
    },

    selectDeleteFn: (state) => {
      state.items = state.items.filter(
        (item) => !state.checkItem.some((el) => el.id === item.id)
      );

      state.checkItem = [];
    },

    receiveMethod: (state, action) => {
      state.receive = action.payload;
    },
  },
});

export const {
  addCart,
  PlusFn,
  MinusFn,
  DeleteFn,
  ResetFn,
  checkedChange,
  allChecked,
  selectDeleteFn,
  receiveMethod,
} = cartSlice.actions;

export default cartSlice.reducer;
