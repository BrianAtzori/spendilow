// ------ REDUX ------
import { createSlice } from "@reduxjs/toolkit";

export const userLoggedSlice = createSlice({
    name: 'userLogged',
    initialState: {
        value: false
    },
    reducers: {
        changeUserLoggedState: state => {
            state.value = !state.value;
        }
    }
})

export const { changeUserLoggedState } = userLoggedSlice.actions

export default userLoggedSlice.reducer