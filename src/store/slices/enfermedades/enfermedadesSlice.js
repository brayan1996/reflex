import { createSlice } from '@reduxjs/toolkit';
import { enfermedadesData } from '../../../dataFalsa/enfermedades';
export const enfermedadesSlice = createSlice({
    name: 'enfermedades',
    initialState: {
        enfermedadesData: enfermedadesData
    },
    reducers: {
        increment: (state, /* action */ ) => {
            state.counter += 1;
        },
    }
});


// Action creators are generated for each case reducer function
export const { increment } =  enfermedadesSlice.actions;