// ------ REDUX ------
import { configureStore } from "@reduxjs/toolkit";

// ------ SLICES ------
import userLoggedReducer from "./reducers/auth/userLoggedSlice";
import userProfileReducer from "./reducers/user/userProfileSlice";
import userTransactionsSlice from "./reducers/transactions/userTransactionsSlice";

export const store = configureStore({
  reducer: {
    userLogged: userLoggedReducer,
    userProfile: userProfileReducer,
    userTransactions: userTransactionsSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
