import { CreateSliceOptions, createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [],
      shippingAddress: {},
      paymentMethod: "PayPal",
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // both for adding items as well as for updating items
    itemAdded: (state, action) => {
      const Item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === Item._id);
      if (existItem) {
        state.cartItems = state.cartItems.map((item) =>
          item._id === existItem._id ? Item : item
        );
      } else {
        state.cartItems = [...state.cartItems, Item];
      }
      return updateCart(state);
    },
    itemRemoved: (state, action) => {
      const Item = action.payload;
      state.cartItems = state.cartItems.filter((item) => item._id !== Item._id);
      return updateCart(state);
    },

    shippingAddressSaved: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    paymentMethodSaved: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    cartItemCleared: (state, action) => {
      state.cart = [];
      return updateCart(state);
    },
  },
});

const {
  itemAdded,
  itemRemoved,
  shippingAddressSaved,
  paymentMethodSaved,
  cartItemCleared,
} = cartSlice.actions;

export default cartSlice.reducer;

// @addItem
export const addItem = (item) => (dispatch, getState) => {
  dispatch(itemAdded(item));
};

// @removeItem
export const removeItem = (item) => (dispatch, getState) => {
  dispatch(itemRemoved(item));
};

// @addShippingAddress
export const saveShippingAddress = (item) => (dispatch, getState) => {
  dispatch(shippingAddressSaved(item));
};

// @addPaymentMethod
export const savePaymentMethod = (item) => (dispatch, getState) => {
  dispatch(paymentMethodSaved(item));
};

// @clearCartItems
export const clearCartItems = (item) => (dispatch, getState) => {
  dispatch(cartItemCleared());
};
