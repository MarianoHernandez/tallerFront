import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  peoples: [],
};

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    savepeople: (state, action) => {
      state.peoples = action.payload
    },
    addPeople: (state, action) => {
        state.peoples.push(action.payload);
    }
  },
});

export const { addPeople, savepeople,deletePeople } = peopleSlice.actions;
export default peopleSlice.reducer;