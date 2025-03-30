import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  total_item: 0,
  shippingCost: null,
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
      state.totalPrice = state.items
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2);
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload._id
      );
      state.totalPrice = state.items
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2);
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload._id);
      if (item) {
        if (!item.quantity) {
          item.quantity = 1;
        }
        item.quantity += 1;
      }
      state.totalPrice = state.items
        .reduce((total, item) => total + item.quantity * item.price, 0)
        .toFixed(2);
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload._id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      state.totalPrice = state.items
        .reduce((total, item) => total + item.quantity * item.price, 0)
        .toFixed(2);
    },
    
    emptyContainer: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.shippingCost = null;
    },
    setShippingCost: (state, action) => {
      state.shippingCost = action.payload;
    },
  },
});
export const {
  addItems,
  deleteItem,
  incrementQuantity,
  decrementQuantity,
  emptyContainer,
  setShippingCost,
} = cartSlice.actions;
export default cartSlice;
