import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux"
import { lazy, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
// PrimeReact
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

// Css
import './assets/demo/flags/flags.css';
import './assets/demo/Demos.scss';
import './assets/layout/layout.scss';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import Loading from './components/loading/loading';
//PAGES

const ConsultaCitas = lazy(()=> import('./pages/citas/ConsultaCitas'))
const EnfermedadesPage = lazy(()=> import('./pages/enfermedades/EnfermedadesPage'))
const Login = lazy(()=> import('./pages/Login'))
const Home = lazy(()=> import('./pages/Home'))
const PersonasPage = lazy(()=> import('./pages/personas/PersonasPage'))
const ResultadoConsulta = lazy(()=> import('./pages/resultadoConsulta/ResultadoConsulta'))
const ResgistroDiagnosticoPage = lazy(()=> import('./pages/archivosMaestros/registroDiagnosticoInterno/ResgistroDiagnosticoPage'))
const RegistroDiagnosticoMedicoPage = lazy(()=> import('./pages/archivosMaestros/registroDiagnosticoMedico/RegistroDiagnosticoMedicoPage'))
const RegistroPacientesPage = lazy(()=> import('./pages/archivosMaestros/registroPacientes/RegistroPacientesPage'))
const RegistroTerapeutaPage = lazy(()=> import('./pages/archivosMaestros/registroTerapeuta/RegistroTerapeutaPage'))
const Reportes = lazy(()=> import('./pages/reportes/reporte/Reportes'))
// import AtencionDiariaPacientePage from './pages/reportes/atencionDiariaPaciente/AtencionDiariaPacientePage';
// import AtencionDiariaTerapeutaPage from './pages/reportes/atencionDiariaTerapeuta/AtencionDiariaTerapeutaPage';
// import CobranzaPage from './pages/reportes/cobranza/CobranzaPage';
// import DatosPaciente from './pages/reportes/datosPaciente/DatosPaciente';
// import EstadisticaPacienteResultadoPage from './pages/reportes/estadisticaPacienteResultado/EstadisticaPacienteResultadoPage';
// import EstadisticaPacientesEdadPage from './pages/reportes/estadisticaPacientesEdad/EstadisticaPacientesEdadPage';
// import EstadisticaPacientesSexoPage from './pages/reportes/estadisticaPacientesSexo/EstadisticaPacientesSexoPage';
// import PlanillaTerapeutaMensualPage from './pages/reportes/planillaTerapeutaMensual/PlanillaTerapeutaMensualPage';
// import PlanillaTerapeutaMensualRotatorioPage from './pages/reportes/planillaTerapeutaMensualRotatorio/PlanillaTerapeutaMensualRotatorioPage';
// import ReporteDiariaPage from './pages/reportes/reporteDiaria/ReporteDiariaPage';
// import SeparacionCitaDiarioPage from './pages/reportes/separacionCitaDiario/SeparacionCitaDiarioPage';
// import PlanillaTerapeutasDiariaPage from './pages/reportes/planillaTerapeutasDiaria/PlanillaTerapeutasDiariaPage';

function App() {
  const { status } = useSelector( state => state.users )
  return (
    <Suspense fallback={<Loading/>}>
      <ToastContainer />
      <Routes>
        {
          status == 'authenticated'
          ?  <Route exact path={'/*'} element={<Home />}>
                <Route exact path={'citas'} element={<ConsultaCitas />} />
                <Route exact path={'enfermedades'} element={<EnfermedadesPage />} />
                <Route exact path={'personas'} element={<PersonasPage />} />
                <Route
                  exact
                  path={'resgistro-diagnostico'}
                  element={<ResgistroDiagnosticoPage />}
                />
                <Route
                  exact
                  path={'registro-diagnostico-medico'}
                  element={<RegistroDiagnosticoMedicoPage />}
                />
                <Route
                  exact
                  path={'registro-pacientes'}
                  element={<RegistroPacientesPage />}
                />
                <Route
                  exact
                  path={'registro-terapeuta'}
                  element={<RegistroTerapeutaPage />}
                />
                <Route exact path={'reportes'} element={<Reportes />} />
                <Route
                  exact
                  path={'resultado-consulta'}
                  element={<ResultadoConsulta />}
                />
              </Route>
          :   <Route exact path={'/login/*'} element={<Login />} />
        }
        <Route exact path={'/*'} element={<Navigate to='/login' />} />
      </Routes>
    </Suspense>
  );
}

export default App;
