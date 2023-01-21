import { Routes, Route } from 'react-router-dom';
import { ConsultaCitas } from './pages/citas/ConsultaCitas'
import { EnfermedadesPage } from './pages/EnfermedadesPage';
import Login from './pages/Login'
import Home from './pages/Home'
// PrimeReact
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

// Css
import './assets/demo/flags/flags.css';
import './assets/demo/Demos.scss';
import './assets/layout/layout.scss';
import './App.css'

function App() {

  return (
    <div>
      <Routes>
        <Route exact path={'/'} element={<Login />} />
        <Route exact path={'/'} element={<Home />}>
          <Route
            exact
            path={'citas'}
            element={<ConsultaCitas />}
          />
          <Route
            exact
            path={'enfermedades'}
            element={<EnfermedadesPage />}
          />
        </Route>
      </Routes>
    </div>
  )
}

export default App
