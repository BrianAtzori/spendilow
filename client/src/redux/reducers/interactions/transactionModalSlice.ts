import { createSlice } from '@reduxjs/toolkit';

export const transactionModalSlice = createSlice({
  name: 'transactionModalShowing',
  initialState: { isShowing: false },
  reducers: {
    setTransactionModalShowing: (state, action) => {
      state.isShowing = action.payload;
    },
  },
});

export const { setTransactionModalShowing } = transactionModalSlice.actions;

export default transactionModalSlice.reducer;
