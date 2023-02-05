import { createSlice } from '@reduxjs/toolkit';

export const reactivosSlice = createSlice({
    name: 'reactivos',
    initialState: {
        historyPersonSelected: {}
    },
    reducers: {
        setHistoryPersonSelected:( state, action) =>{
            state.historyPersonSelected = action.payload
        }
    }
});


// Action creators are generated for each case reducer function
export const { setHistoryPersonSelected } =  reactivosSlice.actions;