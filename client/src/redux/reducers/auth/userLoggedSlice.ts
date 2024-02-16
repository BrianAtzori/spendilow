// ------ REDUX ------
import { createSlice } from "@reduxjs/toolkit";

export const userLoggedSlice = createSlice({
  name: "userLogged",
  initialState: {
    value: false,
  },
  reducers: {
    changeUserLoggedState: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeUserLoggedState } = userLoggedSlice.actions;

export default userLoggedSlice.reducer;
