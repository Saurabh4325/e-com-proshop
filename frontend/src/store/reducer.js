import { apiSlice } from "../slices/apiSlice";
import { combineReducers } from "@reduxjs/toolkit";
import cartSliceReducer from "../slices/cartSlice";
import authSliceReducer from "../slices/authSlice";

const reducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  cart: cartSliceReducer,
  auth: authSliceReducer,
});
export default reducer;
