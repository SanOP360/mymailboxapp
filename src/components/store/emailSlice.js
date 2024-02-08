// emailSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const emailSlice = createSlice({
  name: "email",
  initialState: {
    emails: [],
    unreadCount: 0,
  },
  reducers: {
    fetchEmailsSuccess: (state, action) => {
      state.emails = action.payload;
      state.unreadCount = action.payload.filter((email) => !email.read).length;
    },
    markAsRead: (state, action) => {
      state.emails = state.emails.map((email) =>
        email.id === action.payload ? { ...email, read: true } : email
      );
      state.unreadCount -= 1;
    },
  },
});

export const { fetchEmailsSuccess, markAsRead } = emailSlice.actions;

export default emailSlice.reducer;
