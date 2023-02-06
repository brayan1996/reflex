import { createSlice } from '@reduxjs/toolkit';
export const personasSlice = createSlice({
    name: 'personas',
    initialState: {
        dataPersons:[],
        dataAPerson:{},
        loadingPersons:false
    },
    reducers: {
        loadingPersons:(state)=>{
            state.loadingPersons = true
        },
        loadingFinished:( state )=>{
            state.loadingPersons = false
        },
        setPersons:(state, action) => {
            state.dataPersons = action.payload.allPersons
            state.loadingPersons = false
        },
        setAPerson:(state, action)=>{
            state.dataAPerson = action.payload
        }
    }
});


// Action creators are generated for each case reducer function
export const { loadingPersons, setPersons, setAPerson, loadingFinished } =  personasSlice.actions;