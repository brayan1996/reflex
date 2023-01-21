import { configureStore } from '@reduxjs/toolkit';
import { citasSlice } from './slices/citas';
import { enfermedadesSlice } from './slices/enfermedades';
import { personasSlice } from './slices/personas';
export const store = configureStore({
  reducer: {
      citas: citasSlice.reducer,
      enfermedades: enfermedadesSlice.reducer,
      personas: personasSlice.reducer
  }
})