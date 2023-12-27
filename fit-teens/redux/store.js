import { configureStore } from '@reduxjs/toolkit';
import LoginSlice from './loginSlice';
import jadwalSlice from './jadwalSlice';

export const store = configureStore({
    reducer: {
        login: LoginSlice,
        aktivitas: jadwalSlice
    },
});