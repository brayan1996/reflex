import { createSlice } from '@reduxjs/toolkit';

export const direccionesSlice = createSlice({
    name: 'direcciones',
    initialState: {
        direccionPersonal:{},
        isLoading:false
    },
    reducers: {
        isLoading:(state)=>{
            state.isLoading = true
        },
        setDirectionPersonal:(state, action)=>{
            state.direccionPersonal = action.payload
            state.isLoading = false
        }
    }
});


// Action creators are generated for each case reducer function
export const { isLoading, setDirectionPersonal } =  direccionesSlice.actions;