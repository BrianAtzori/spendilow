// ------ REDUX ------
import { createSlice } from '@reduxjs/toolkit';

export const userBudgetsSlice = createSlice({
  name: 'userTransactions',
  initialState: {
    budgets: [
      {
        id: '1',
        name: '',
        description: '',
      },
    ],
  },
  reducers: {
    updateUserBudgets: (state, action) => {
      state.budgets = action.payload;
    },
  },
});

export const { updateUserBudgets } = userBudgetsSlice.actions;

export default userBudgetsSlice.reducer;
