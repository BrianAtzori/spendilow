// ------ REDUX ------
import { configureStore } from "@reduxjs/toolkit";

// ------ SLICES ------
import userLoggedReducer from "./reducers/auth/userLoggedSlice";
import userProfileReducer from "./reducers/user/userProfileSlice";

export const store = configureStore({
  reducer: {
    userLogged: userLoggedReducer,
    userProfile: userProfileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
