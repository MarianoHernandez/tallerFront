import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  citys: [],
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    addcity: (state, action) => {
      state.citys.push(action.payload);
    },
    savecity: (state, action) => {
      state.citys = action.payload
    }
  },
});

export const { addcity, savecity } = citySlice.actions;
export default citySlice.reducer;