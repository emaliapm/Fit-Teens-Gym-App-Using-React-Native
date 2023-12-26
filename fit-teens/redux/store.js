import { configureStore } from '@reduxjs/toolkit';
import profileSlice from './profileSlice';
import taskSlice from './taskSlice';

export const store = configureStore({
    reducer: {
        login: profileSlice,
        task: taskSlice
    },
});