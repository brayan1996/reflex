import { Routes, Route } from 'react-router-dom';
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
//PAGES
import { ConsultaCitas } from './pages/citas/ConsultaCitas';
import { EnfermedadesPage } from './pages/enfermedades/EnfermedadesPage';
import Login from './pages/Login';
import Home from './pages/Home';
import PersonasPage from './pages/personas/PersonasPage';
import ResultadoConsulta from './pages/resultadoConsulta/ResultadoConsulta';
import ResgistroDiagnosticoPage from './pages/archivosMaestros/registroDiagnosticoInterno/ResgistroDiagnosticoPage';
import RegistroDiagnosticoMedicoPage from './pages/archivosMaestros/registroDiagnosticoMedico/RegistroDiagnosticoMedicoPage';
import RegistroPacientesPage from './pages/archivosMaestros/registroPacientes/RegistroPacientesPage';
import RegistroTerapeutaPage from './pages/archivosMaestros/registroTerapeuta/RegistroTerapeutaPage';
import AtencionDiariaPacientePage from './pages/reportes/atencionDiariaPaciente/AtencionDiariaPacientePage';
import AtencionDiariaTerapeutaPage from './pages/reportes/atencionDiariaTerapeuta/AtencionDiariaTerapeutaPage';
import CobranzaPage from './pages/reportes/cobranza/CobranzaPage';
import DatosPaciente from './pages/reportes/datosPaciente/DatosPaciente';
import EstadisticaPacienteResultadoPage from './pages/reportes/estadisticaPacienteResultado/EstadisticaPacienteResultadoPage';
import EstadisticaPacientesEdadPage from './pages/reportes/estadisticaPacientesEdad/EstadisticaPacientesEdadPage';
import EstadisticaPacientesSexoPage from './pages/reportes/estadisticaPacientesSexo/EstadisticaPacientesSexoPage';
import PlanillaTerapeutaMensualPage from './pages/reportes/planillaTerapeutaMensual/PlanillaTerapeutaMensualPage';
import PlanillaTerapeutaMensualRotatorioPage from './pages/reportes/planillaTerapeutaMensualRotatorio/PlanillaTerapeutaMensualRotatorioPage';
import ReporteDiariaPage from './pages/reportes/reporteDiaria/ReporteDiariaPage';
import SeparacionCitaDiarioPage from './pages/reportes/separacionCitaDiario/SeparacionCitaDiarioPage';
import PlanillaTerapeutasDiariaPage from './pages/reportes/planillaTerapeutasDiaria/PlanillaTerapeutasDiariaPage';
import Reportes from './pages/reportes/reporte/Reportes';

function App() {
  return (
    <>
      <Routes>
        <Route exact path={'/'} element={<Login />} />
        <Route exact path={'/'} element={<Home />}>
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
      </Routes>
    </>
  );
}

export default App;
