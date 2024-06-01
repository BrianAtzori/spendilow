// ------ REDUX ------
import { createSlice } from '@reduxjs/toolkit';

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: {
    value: {
      id: '',
      email: '',
      isMFAActive: false,
      savings: 0,
      salary: 0,
      profileimage: '',
      workfield: '',
      username: '',
    },
  },
  reducers: {
    updateUserProfile: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateUserProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;
