import { configureStore } from '@reduxjs/toolkit';
import signUpSlice from './signUpSlice';
import taskSlice from './taskSlice';

export const store = configureStore({
    reducer: {
        signUp: signUpSlice,
        task: taskSlice
    },
});