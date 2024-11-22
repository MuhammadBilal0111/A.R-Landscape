import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  total_item: "",
  totalPrice: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems: (state, action) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        state.items = state.items.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload._id
      );
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload._id);
      if (item) {
        if (!item.quantity) {
          item.quantity = 1;
        }
        item.quantity += 1;
      }
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.quantity * item.price
      );
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload._id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.quantity * item.price
      );
    },
    calculateTotalPrice: (state) => {
      state.totalPrice = state.items.reduce((totalPrice, item) => {
        return totalPrice + item.price * item.quantity;
      }, 0);
    },
  },
});
export const { addItems, deleteItem, incrementQuantity, decrementQuantity } =
  cartSlice.actions;
export default cartSlice;
