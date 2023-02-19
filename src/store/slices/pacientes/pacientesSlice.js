import { createSlice } from '@reduxjs/toolkit';

export const pacientesSlice = createSlice({
    name: 'pacientes',
    initialState: {
        patientsData: [],
        loadingPatients:false,
        APatient:{}
    },
    reducers: {
        loadingPatientsAction: (state ) => {
            state.loadingPatients  = true
        },
        finishLoadingPatients:(state) =>{
            state.loadingPatients = false
        },
        requestPatients: (state, action) =>{
            state.patientsData = action.payload
        },
        seleactAPatient:(state, action ) =>{
            state.APatient = action.payload
        }
    }
});


// Action creators are generated for each case reducer function
export const { loadingPatientsAction, finishLoadingPatients, requestPatients, seleactAPatient} =  pacientesSlice.actions;