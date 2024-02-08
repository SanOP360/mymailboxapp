// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import emailReducer from "./emailSlice"; // Import the emailSlice

const store = configureStore({
  reducer: {
    auth: authReducer,
    email: emailReducer, // Add emailSlice to reducers
  },
});

export default store;
