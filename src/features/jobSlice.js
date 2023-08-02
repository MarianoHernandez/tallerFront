import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: [],
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    addjob: (state, action) => {
      state.jobs.push(action.payload);
    },
    savejob: (state, action) => {
      state.jobs = action.payload
    }
  },
});

export const { addjob,savejob } = jobSlice.actions;
export default jobSlice.reducer;