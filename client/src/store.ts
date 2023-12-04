// ------ REDUX ------
import { configureStore } from "@reduxjs/toolkit";

// ------ SLICES ------
import mainReducer from "./features/main/mainSlice";

export default configureStore({
    reducer: {
        main: mainReducer
    }
})