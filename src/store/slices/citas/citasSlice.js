import { createSlice } from '@reduxjs/toolkit';
export const citasSlice = createSlice({
    name: 'citas',
    initialState: {
        citasData: [],
        isLoading:false
    },
    reducers: {
        loadingDates:(state)=>{
            state.isLoading = true
        },
        setDates:(state, action) => {
            state.citasData = action.payload.allCitas
            state.isLoading = false
        },
        changeStateCitas:(state,action) => {
            state.citasData = action.payload
        }
      
    }
});


// Action creators are generated for each case reducer function
export const { setDates, loadingDates, changeStateCitas } =  citasSlice.actions;