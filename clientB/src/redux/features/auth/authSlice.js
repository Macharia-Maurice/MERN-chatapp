import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    isLoading: true,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,  // Corrected this line
    reducers: {

        setAuth: (state) => {
            state.isAuthenticated = true;
        },

        logout: (state) => {
            state.isAuthenticated = false;
        },

        finishInitialLoading: (state) => {
            state.isLoading = false;
        }
    }
});

export const { setAuth, logout, finishInitialLoading } = authSlice.actions;

export default authSlice.reducer;
