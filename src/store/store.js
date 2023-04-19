import { configureStore }           from '@reduxjs/toolkit';
import { citasSlice }               from './slices/citas';
import { enfermedadesSlice }        from './slices/enfermedades';
import { personasSlice }            from './slices/personas';
import { direccionesSlice }         from './slices/direcciones';
import { reactivosSlice }           from './slices/reactivos';
import { historialSlice }           from './slices/historial';
import { terapeutasSlice }          from './slices/terapeutas';
import { diagnosticoInternoSlice }  from './slices/diagnosticoMedicoInterno';
import { diagnosticoMedicoSlice }   from './slices/diagnosticoMedico/diagnosticoMedicoSlice';
import { pacientesSlice }           from './slices/pacientes';
import { usersSlice }               from './slices/users';

export const store = configureStore({
  reducer: {
      citas: citasSlice.reducer,
      enfermedades: enfermedadesSlice.reducer,
      personas: personasSlice.reducer,
      direcciones: direccionesSlice.reducer,
      reactivos:reactivosSlice.reducer,
      historial:historialSlice.reducer,
      terapeutas:terapeutasSlice.reducer,
      diagnosticoInterno:diagnosticoInternoSlice.reducer,
      diagnosticoMedico:diagnosticoMedicoSlice.reducer,
      pacientes:pacientesSlice.reducer,
      users: usersSlice.reducer
  }
})