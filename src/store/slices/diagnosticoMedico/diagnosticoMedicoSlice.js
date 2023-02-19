import { createSlice } from '@reduxjs/toolkit';

export const diagnosticoMedicoSlice = createSlice({
    name: 'diagnosticoMedico',
    initialState: {
        allDiagnosis: [],
        loadingDiagnosis:false,
        aDiagnosis:{}
    },
    reducers: {
        setLoading: (state ) => {
            state.loadingDiagnosis = true
        },
        finishLoading:( state ) =>{
            state.loadingDiagnosis = false
        },
        setDiagnosis:( state, action ) =>{
            state.allDiagnosis = action.payload
        },
        selectADiagnosis:(state,action) =>{
            state.aDiagnosis = action.payload
        }
    }
});


// Action creators are generated for each case reducer function
export const { setLoading, finishLoading, setDiagnosis, selectADiagnosis } =  diagnosticoMedicoSlice.actions;