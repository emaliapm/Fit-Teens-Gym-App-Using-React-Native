// Import the createSlice API from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// This is the initial state of the slice
const initialState = {
    email: '',
    uname: '',
    pass: ''
};

export const signUpSlice = createSlice({
    name: 'signUp', // This is the name of the slice, we will later use this name to access the slice from the store
    initialState: initialState, // This is the initial state of the slice
    reducers: {
        // All the reducers go here
        setEmail: (state, action) => {
            // This is the reducer function for the deposit action
            state.email = action.payload;
        },
        setUname: (state, action) => {
            // This is the reducer function for the withdraw action
            state.uname = action.payload;
        },
        setPass: (state, action) => {
            // This is the reducer function for the withdraw action
            state.pass = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setEmail, setUname, setPass } = signUpSlice.actions;

// We export the reducer function so that it can be added to the store
export default signUpSlice.reducer;