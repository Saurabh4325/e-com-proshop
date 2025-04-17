import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    credentialAdded: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    loggedOut: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

const { credentialAdded, loggedOut } = authSlice.actions;
export default authSlice.reducer;

export const setCredential = (item) => (dispatch, getState) => {
  dispatch(credentialAdded(item));
};

export const logout = () => (dispatch, getState) => {
  dispatch(loggedOut());
};
