import { configureStore } from '@reduxjs/toolkit';
import LoginSlice from './loginSlice';
import taskSlice from './taskSlice';

export const store = configureStore({
    reducer: {
        login: LoginSlice,
        task: taskSlice
    },
});