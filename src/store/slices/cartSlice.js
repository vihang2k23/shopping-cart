import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCartOpen: false,
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart(state, action) {
        console.log('action:toggleCart ', action);
        console.log('state:toggleCart ', state);
      state.isCartOpen = action.payload;
    },

    addItem(state, action) {
      console.log('action: ', action);
      console.log('state: ', state);
      const newItemId = action.payload.id;
      console.log('newItemId: ', newItemId);
      const existingItem = state.cartItems.find(
          (item) => item.id === newItemId
          );
        console.log('existingItem: ', existingItem);

      if (existingItem) {
        console.log('existingItem: ', existingItem);
        existingItem.quantity++;
      } else {
        state.cartItems.push(action.payload);
      }
    },

    removeItem(state, action) {
        console.log('action:removeItem ', action);
        console.log('state: removeItem', state);
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },

    incrementItem(state, action) {
      state.cartItems = state.cartItems.map((item) => {
        if (item.id === action.payload) {
          item.quantity++;
        }
        return item;
      });
    },

    decrementItem(state, action) {
      state.cartItems = state.cartItems
        .map((item) => {
          if (item.id === action.payload) {
            item.quantity--;
          }
          return item;
        })
        .filter((item) => item.quantity !== 0);
    },
  },
});

export const {
  toggleCart,
  addItem,
  removeItem,
  incrementItem,
  decrementItem,
} = cartSlice.actions;
export default cartSlice.reducer;
