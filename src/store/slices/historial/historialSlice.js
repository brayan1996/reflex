import { createSlice } from '@reduxjs/toolkit';

export const historialSlice = createSlice({
    name: 'historial',
    initialState: {
        historialSelected:{},
        isLoadingHistorial:false,
        isExist:true
    },
    reducers: {
        isLoading:(state)=>{
            state.isLoadingHistorial = true
        },
        setHistorialSelected:(state, action) => {
            state.historialSelected = action.payload
            state.isLoadingHistorial = false
        },
        changeIsExist:(state, action)=>{
            state.isExist = action.payload
        }
    }
});


// Action creators are generated for each case reducer function
export const { isLoading, setHistorialSelected, changeIsExist } =  historialSlice.actions;