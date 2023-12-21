import { configureStore } from '@reduxjs/toolkit';
import signUpSlice from './profileSlice';
import taskSlice from './taskSlice';

export const store = configureStore({
    reducer: {
        signUp: signUpSlice,
        task: taskSlice
    },
});