import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  countrys: [],
};

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    savecountry: (state, action) => {
      state.countrys = action.payload
    }
  },
});

export const { addcountry, savecountry } = countrySlice.actions;
export default countrySlice.reducer;