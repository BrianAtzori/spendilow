// ------ REDUX ------
import { configureStore } from "@reduxjs/toolkit";

// ------ SLICES ------
import userLoggedReducer from "./reducers/auth/userLoggedSlice";
import userProfileReducer from "./reducers/user/userProfileSlice";
import userTransactionsSlice from "./reducers/transactions/userTransactionsSlice";
import transactionModalSlice from "./reducers/interactions/transactionModalSlice";
import transactionMenuModalSlice from "./reducers/interactions/transactionMenuModalSlice";
import userBudgetSlice from "./reducers/budgets/userBudgetSlice";

export const store = configureStore({
  reducer: {
    userLogged: userLoggedReducer,
    userProfile: userProfileReducer,
    userTransactions: userTransactionsSlice,
    transactionModal: transactionModalSlice,
    transactionMenuModal: transactionMenuModalSlice,
    userBudget: userBudgetSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
