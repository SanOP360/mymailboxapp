// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import emailReducer from "./emailSlice"; // Import the emailSlice
import sentReducer from "./sentSlice"; // Import the sentSlice

const store = configureStore({
  reducer: {
    auth: authReducer,
    email: emailReducer,
    sent: sentReducer, // Add sentSlice to reducers
  },
});

export default store;

