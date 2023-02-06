import { createSlice } from '@reduxjs/toolkit';
export const enfermedadesSlice = createSlice({
    name: 'enfermedades',
    initialState: {
        diseasesAllData: [],
        isLoadingDiseases:false,
        selectedDiseases:{}
    },
    reducers: {
        loadingDiseases:(state)=>{
            state.isLoadingDiseases = true
        },
        endLoadingDiseases:(state)=>{
            state.isLoadingDiseases = false
        },
        setAllDiseases:(state, action) =>{
            state.diseasesAllData = action.payload
            state.isLoadingDiseases = false
        },
        setDiseasesSelected: (state, action) => {
            state.selectedDiseases = action.payload
        }
    }
});


// Action creators are generated for each case reducer function
export const { loadingDiseases, endLoadingDiseases, setAllDiseases, setDiseasesSelected } =  enfermedadesSlice.actions;