import { createSlice } from '@reduxjs/toolkit';

export const personasSlice = createSlice({
    name: 'personas',
    initialState: {
        dataPersons:[],
        loadingPersons:false
    },
    reducers: {
        loadingPersons:(state)=>{
            state.loadingPersons = true
        },
        setPersons:(state, action) => {
            state.dataPersons = action.payload.allPersons
            state.loadingPersons = false
        }
    }
});


// Action creators are generated for each case reducer function
export const { loadingPersons, setPersons } =  personasSlice.actions;