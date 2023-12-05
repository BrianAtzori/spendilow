// ------ REDUX ------
import { configureStore } from "@reduxjs/toolkit";

// ------ SLICES ------
import mainReducer from "./reducers/main/mainSlice";

export default configureStore({
    reducer: {
        main: mainReducer
    }
})