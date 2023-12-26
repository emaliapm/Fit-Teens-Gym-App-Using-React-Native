// Import the createSlice API from Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchActivity = createAsyncThunk('activity/fetchActivity', async (params) => {
    const response = await axios.get('https://pm-todo-api.informatika-itts.my.id/api/tasks', { params });
    const results = response.data.data;
    return results;
});

export const storeActivity = createAsyncThunk('activity/storeActivity', async (payload, { dispatch }) => {
    try {
        const response = await axios.post('https://pm-todo-api.informatika-itts.my.id/api/tasks', payload);
        const results = response.data;
        if (results.success) {
            dispatch(fetchActivity({ uname: payload.uname, isComplete: "0" }));
        }
        return results;
    } catch (error) {
        console.log('error storeActivity', error)
    }
});

export const updateActivity = createAsyncThunk('activity/updateActivity', async (payload, { dispatch }) => {
    try {
        const response = await axios.put('https://pm-todo-api.informatika-itts.my.id/api/tasks/' + payload.id, payload);
        const results = response.data;
        if (results.success) {
            dispatch(fetchActivities({ uname: payload.uname, isComplete: payload.completed ? "1" : "0" }));
        }
        return results;
    } catch (error) {
        console.log('error updateActivity', error)
    }
});

export const deleteActivity = createAsyncThunk('activity/deleteActivity', async (payload, { dispatch }) => {
    try {
        const response = await axios.delete('https://pm-todo-api.informatika-itts.my.id/api/tasks/' + payload.id);
        const results = response.data;
        if (results.success) {
            dispatch(fetchActivity({ uname: payload.uname, isComplete: payload.completed ? "1" : "0" }));
        }
        return results;
    } catch (error) {
        console.log('error deleteActivity', error)
    }
});

// This is the initial state of the slice
const initialState = {
    data: [],
    loading: true
};

export const jadwalSlice = createSlice({
    name: 'activity', // This is the name of the slice, we will later use this name to access the slice from the store
    initialState: initialState, // This is the initial state of the slice
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchActivity.pending, state => {
            console.log('pending fetchActivity');
            state.loading = true
        })
        builder.addCase(fetchActivity.fulfilled, (state, action) => {
            console.log('fulfilled fetchActivity', action.payload);
            state.data = action.payload
            state.loading = false
        })
        builder.addCase(fetchActivity.rejected, state => {
            console.log('rejected fetchActivity');
            state.loading = false
        })
        builder.addCase(storeActivity.pending, state => {
            console.log('pending storeActivity');
            state.loading = true
        })
        builder.addCase(storeActivity.fulfilled, (state, action) => {
            console.log('fulfilled storeActivity', action.payload);
            state.loading = false
        })
        builder.addCase(storeActivity.rejected, state => {
            console.log('rejected storeActivity');
            state.loading = false
        })
        builder.addCase(updateActivity.pending, state => {
            console.log('pending updateActivity');
            state.loading = true
        })
        builder.addCase(updateActivity.fulfilled, (state, action) => {
            console.log('fulfilled updateActivity', action.payload);
            state.loading = false
        })
        builder.addCase(updateActivity.rejected, state => {
            console.log('rejected updateActivity');
            state.loading = false
        })
        builder.addCase(deleteActivity.pending, state => {
            console.log('pending deleteActivity');
            state.loading = true
        })
        builder.addCase(deleteActivity.fulfilled, (state, action) => {
            console.log('fulfilled deleteActivity', action.payload);
            state.loading = false
        })
        builder.addCase(deleteActivity.rejected, state => {
            console.log('rejected deleteActivity');
            state.loading = false
        })
    }
});

// We export the reducer function so that it can be added to the store
export default jadwalSlice.reducer;