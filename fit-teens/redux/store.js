import { configureStore } from '@reduxjs/toolkit';
<<<<<<< HEAD
import profileSlice from './profileSlice';
import taskSlice from './taskSlice';

export const store = configureStore({
    reducer: {
        login: profileSlice,
        task: taskSlice
=======
import LoginSlice from './loginSlice';
import jadwalSlice from './jadwalSlice';

export const store = configureStore({
    reducer: {
        login: LoginSlice,
        aktivitas: jadwalSlice
>>>>>>> 1e0977c035f93e53a24d79eec69af2a933c0bb85
    },
});