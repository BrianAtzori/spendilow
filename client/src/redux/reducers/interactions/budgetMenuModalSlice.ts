// ------ REDUX ------
import { createSlice } from "@reduxjs/toolkit";

export const budgetMenuModalSlice = createSlice({
  name: "budgetMenuModalSliceShowing",
  initialState: { isShowing: false, budgetID: "" },
  reducers: {
    setBudgetMenuModalSliceShowing: (state, action) => {
      // console.log(state.isShowing)
      state.isShowing = action.payload;
    },
    setBudgetMenuModalSliceBudgetId: (state, action) => {
      state.budgetID = action.payload;
    },
  },
});

export const {
  setBudgetMenuModalSliceShowing,
  setBudgetMenuModalSliceBudgetId,
} = budgetMenuModalSlice.actions;

export default budgetMenuModalSlice.reducer;
