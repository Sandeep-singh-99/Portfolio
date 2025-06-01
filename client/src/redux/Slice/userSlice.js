import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        isAuthenticated: false,
        loading: false,
    },

    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
        },

        AuthVerify: (state, action) => {
            state.user = action.payload || null;
            state.isAuthenticated = true;
            state.loading = false;
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
        },
    }
})

export const { setUser, setLoading, logout, AuthVerify } = userSlice.actions;

export default userSlice.reducer;