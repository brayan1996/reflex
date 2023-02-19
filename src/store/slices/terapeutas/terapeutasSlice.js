import { createSlice } from '@reduxjs/toolkit';

export const terapeutasSlice = createSlice({
    name: 'terapeutas',
    initialState: {
        terapeutasData: [],
        loadingTerapeutas:false,
        ATherapist:{}
    },
    reducers: {
        loadingTerapeutasAction: (state ) => {
            state.loadingTerapeutas  = true
        },
        finishLoading:(state) =>{
            state.loadingTerapeutas = false
        },
        requestTerapeutas: (state, action) =>{
            state.terapeutasData = action.payload
        },
        seleactATherapist:(state, action ) =>{
            state.ATherapist = action.payload
        }
    }
});


// Action creators are generated for each case reducer function
export const { loadingTerapeutasAction, requestTerapeutas, finishLoading, seleactATherapist } =  terapeutasSlice.actions;