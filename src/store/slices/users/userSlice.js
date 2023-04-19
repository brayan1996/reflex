import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        status: 'not-authenticated',
        email:null,
        nameLogin:null,
        errorMessage:null,
        password:null

    },
    reducers: {
        checkingCredentials: (state, /* action */ ) => {
            state.status = 'checking';
        },
        login:(state, { payload }) =>{
            state.email = payload.email;
            state.nameLogin = payload.nameLogin;
            state.password = payload.password;
            state.errorMessage = null;
            state.status = 'authenticated'
        },
        logout:(state, { payload={} }) => {
            state.email = null;
            state.nameLogin = null; 
            state.password = null;
            state.errorMessage = payload.messageError;
            state.status = 'not-authenticated'

        }
    }
});


// Action creators are generated for each case reducer function
export const { checkingCredentials, login, logout } =  usersSlice.actions;