// ------ REDUX ------
import { createSlice } from "@reduxjs/toolkit";

export const userTransactionsSlice = createSlice({
  name: "userTransactions",
  initialState: {
    transactions: [
      {
        id: "",
        transaction_date: "",
        amount: 0,
        title: "",
        notes: "",
        tags: "",
        transaction_type: "",
        target_id: "",
      },
    ],
  },
  reducers: {
    updateUserTransactions: (state, action) => {
      state.transactions = action.payload;
    },
  },
});

export const { updateUserTransactions } = userTransactionsSlice.actions;

export default userTransactionsSlice.reducer;
