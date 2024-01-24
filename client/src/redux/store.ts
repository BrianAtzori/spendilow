// ------ REDUX ------
import { configureStore } from "@reduxjs/toolkit";

// ------ SLICES ------
import userLoggedReducer from "./reducers/auth/userLoggedSlice";

export const store = configureStore({
    reducer: {
        userLogged: userLoggedReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

