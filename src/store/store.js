import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/userSlice';
import jobReducer from '../features/jobSlice';
import cityReducer from '../features/citySlice';
import countryReducer from '../features/countrySlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        job:jobReducer,
        city:cityReducer,
        country:countryReducer
    }
})