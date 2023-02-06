import { createSlice } from '@reduxjs/toolkit';
export const citasSlice = createSlice({
    name: 'citas',
    initialState: {
        citasData: [],
        isLoading:false,
        citaSelected:{}
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
        },
        setCitasSelected:(state, action)=>{
            state.citaSelected = action.payload
        }
      
    }
});


// Action creators are generated for each case reducer function
export const { setDates, loadingDates, changeStateCitas, setCitasSelected } =  citasSlice.actions;