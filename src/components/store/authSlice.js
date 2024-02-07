import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  idToken: localStorage.getItem("idToken") || null,
  isAuthenticated: !!localStorage.getItem("idToken"),
  email: localStorage.getItem("email") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.idToken = action.payload.idToken;
      state.isAuthenticated = true;
      state.email = action.payload.email;
      localStorage.setItem("MyEmail", state.email);
      localStorage.setItem("myidToken", state.idToken);
    },

    logout(state) {
      state.idToken = null;
      state.isAuthenticated = false;
      state.email = null;
      localStorage.removeItem("myidToken");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
