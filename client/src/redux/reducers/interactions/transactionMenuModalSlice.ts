import { createSlice } from '@reduxjs/toolkit';

export const transactionMenuModalSlice = createSlice({
  name: 'transactionMenuModalSliceShowing',
  initialState: { isShowing: false, transactionID: '' },
  reducers: {
    setTransactionMenuModalSliceShowing: (state, action) => {
      // console.log(state.isShowing)
      state.isShowing = action.payload;
    },
    setTransactionMenuModalSliceTransaction: (state, action) => {
      state.transactionID = action.payload;
    },
  },
});

export const { setTransactionMenuModalSliceShowing, setTransactionMenuModalSliceTransaction } =
  transactionMenuModalSlice.actions;

export default transactionMenuModalSlice.reducer;
