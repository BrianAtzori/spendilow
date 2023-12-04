// ------ REDUX ------
import { createSlice } from "@reduxjs/toolkit";

export const mainSlice = createSlice({
    name: 'main',
    initialState: {
        value: true
    },
    reducers: {
        changeState: state => {
            state.value = !state.value;
        }
    }
})

export const { changeState } = mainSlice.actions

export default mainSlice.reducer