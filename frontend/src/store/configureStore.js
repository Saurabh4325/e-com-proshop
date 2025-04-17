import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import { apiSlice } from "../slices/apiSlice";

const store = configureStore({
  reducer,
  middleware: [...getDefaultMiddleware(), apiSlice.middleware],
});

export default store;
