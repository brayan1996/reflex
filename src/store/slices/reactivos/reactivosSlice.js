import { createSlice } from '@reduxjs/toolkit';

export const reactivosSlice = createSlice({
    name: 'reactivos',
    initialState: {
        historyPersonSelected: {},
        vistaActual:'citas'
    },
    reducers: {
        setHistoryPersonSelected:( state, action) =>{
            state.historyPersonSelected = action.payload
        },
        setVistaPagina:(state, action)=>{
            state.vistaActual = action.payload
        }
    }
});


// Action creators are generated for each case reducer function
export const { setHistoryPersonSelected, setVistaPagina } =  reactivosSlice.actions;