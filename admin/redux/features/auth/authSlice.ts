import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    userLoggedIn: (state, action:PayloadAction<{accessToken:string,user:string}>) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.token = "";
      state.user = "";
    },
  },
});

export const { userLoggedIn, userLoggedOut } =
  authSlice.actions;

  export default authSlice.reducer;