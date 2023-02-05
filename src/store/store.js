import { configureStore } from '@reduxjs/toolkit';
import { citasSlice } from './slices/citas';
import { enfermedadesSlice } from './slices/enfermedades';
import { personasSlice } from './slices/personas';
import { direccionesSlice } from './slices/direcciones';
import { reactivosSlice } from './slices/reactivos';
import { historialSlice } from './slices/historial';

export const store = configureStore({
  reducer: {
      citas: citasSlice.reducer,
      enfermedades: enfermedadesSlice.reducer,
      personas: personasSlice.reducer,
      direcciones: direccionesSlice.reducer,
      reactivos:reactivosSlice.reducer,
      historial:historialSlice.reducer
  }
})