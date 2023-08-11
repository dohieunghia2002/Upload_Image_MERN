import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false
        },

        register: {
            isFetching: false,
            error: false,
            success: false
        },

        avatar: {
            isFeatching: false,
            success: false,
            error: false
        }
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },

        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state) => {
            state.register.isFetching = false;
            state.register.success = true;
            state.register.error = false;
        },
        registerFailed: (state) => {
            state.register.isFetching = false;
            state.register.error = true;
            state.register.success = false;
        },

        logoutStart: (state) => {
            state.login.isFetching = true;
        },
        logoutSuccess: (state) => {
            state.login.isFetching = false;
            state.login.currentUser = null;
            state.login.error = false;
        },
        logoutFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },

        updateAvatarStart: (state) => {
            state.avatar.isFeatching = true;
        },
        updateAvatarSuccess: (state, action) => {
            state.avatar.isFeatching = false;
            state.avatar.success = true;
            state.login.currentUser = action.payload;
            state.avatar.error = false;
        },
        updateAvatarFailed: (state) => {
            state.avatar.isFeatching = false;
            state.avatar.success = false;
            state.avatar.error = true;
        },
    }
});

export const {
    loginStart,
    loginSuccess,
    loginFailed,
    registerStart,
    registerSuccess,
    registerFailed,
    logoutStart,
    logoutSuccess,
    logoutFailed,
    updateAvatarStart,
    updateAvatarSuccess,
    updateAvatarFailed
} = userSlice.actions;

export default userSlice.reducer;