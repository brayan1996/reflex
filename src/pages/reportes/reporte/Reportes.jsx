import { Menu } from 'primereact/menu';
import { useState } from 'react';
import AtencionDiariaPacientePage from '../../../pages/reportes/atencionDiariaPaciente/AtencionDiariaPacientePage';
import AtencionDiariaTerapeutaPage from '../../../pages/reportes/atencionDiariaTerapeuta/AtencionDiariaTerapeutaPage';
import CobranzaPage from '../../../pages/reportes/cobranza/CobranzaPage';
import DatosPaciente from '../../../pages/reportes/datosPaciente/DatosPaciente';
import EstadisticaPacienteResultadoPage from '../../../pages/reportes/estadisticaPacienteResultado/EstadisticaPacienteResultadoPage';
import EstadisticaPacientesEdadPage from '../../../pages/reportes/estadisticaPacientesEdad/EstadisticaPacientesEdadPage';
import EstadisticaPacientesSexoPage from '../../../pages/reportes/estadisticaPacientesSexo/EstadisticaPacientesSexoPage';
import PlanillaTerapeutaMensualPage from '../../../pages/reportes/planillaTerapeutaMensual/PlanillaTerapeutaMensualPage';
import PlanillaTerapeutaMensualRotatorioPage from '../../../pages/reportes/planillaTerapeutaMensualRotatorio/PlanillaTerapeutaMensualRotatorioPage';
import ReporteDiariaPage from '../../../pages/reportes/reporteDiaria/ReporteDiariaPage';
import SeparacionCitaDiarioPage from '../../../pages/reportes/separacionCitaDiario/SeparacionCitaDiarioPage';
import PlanillaTerapeutasDiariaPage from '../../../pages/reportes/planillaTerapeutasDiaria/PlanillaTerapeutasDiariaPage';
const viewReporte = (reporte) =>{
    // const view ={
    //     'atencion-diaria-paciente': ()=>(<AtencionDiariaPacientePage/>)
    // }
    // return view[reporte]
    switch (reporte) {
        case 'atencion-diaria-paciente':
            return <AtencionDiariaPacientePage/>
        case 'atencion-diaria-terapeuta':
            return <AtencionDiariaTerapeutaPage/>
        case 'cobranza':
            return <CobranzaPage/>
        case 'datos-paciente':
            return <DatosPaciente/>
        case 'estadistica-paciente-resultado':
            return <EstadisticaPacienteResultadoPage/>
        case 'estadistica-pacientes-edad':
            return <EstadisticaPacientesEdadPage/>
        case 'estadistica-pacientes-sexo':
            return <EstadisticaPacientesSexoPage/>
        case 'planilla-terapeuta-diaria':
            return <PlanillaTerapeutasDiariaPage/>
        case 'planilla-terapeuta-mensual':
            return <PlanillaTerapeutaMensualPage/>
        case 'planilla-terapeuta-mensual-rotatorio':
            return <PlanillaTerapeutaMensualRotatorioPage/>
        case 'reporte-diaria':
            return <ReporteDiariaPage/>
        case 'separacion-cita-diario':
            return <SeparacionCitaDiarioPage/>
        default:
            return <AtencionDiariaPacientePage/>
    }
}
const Reportes = () => {
    const [reporte, setReporte] = useState('atencion-diaria-paciente')
    const items = [
        {
            label: 'Reportes',
            items: [
                {
                    label: 'Atencion diaria paciente',
                    icon: 'pi pi-users',
                    command: () => {
                        setReporte('atencion-diaria-paciente')
                    }
                },
                {
                    label: 'Atencion diaria terapeuta',
                    icon: 'pi pi-user-plus',
                    command: () => {
                        setReporte('atencion-diaria-terapeuta')
                    }
                },
                {
                    label: 'Cobranza',
                    icon: 'pi pi-dollar',
                    command: () => {
                        setReporte('cobranza')
                    }
                },
                {
                    label: 'Datos paciente',
                    icon: 'pi pi-users',
                    command: () => {
                        setReporte('datos-paciente')
                    }
                },
                {
                    label: 'Estadistica paciente resultado',
                    icon: 'pi pi-chart-line',
                    command: () => {
                        setReporte('estadistica-paciente-resultado')
                    }
                },
                {
                    label: 'Estadistica pacientes edad',
                    icon: 'pi pi-chart-line',
                    command: () => {
                        setReporte('estadistica-pacientes-edad')
                    }
                },
                {
                    label: 'Estadistica pacientes sexo',
                    icon: 'pi pi-chart-line',
                    command: () => {
                        setReporte('estadistica-pacientes-sexo')
                    }
                },
                {
                    label: 'Planilla terapeuta diaria',
                    icon: 'pi pi-file-export',
                    command: () => {
                        setReporte('planilla-terapeuta-diaria')
                    }
                },
                {
                    label: 'Planilla terapeuta mensual',
                    icon: 'pi pi-file-export',
                    command: () => {
                        setReporte('planilla-terapeuta-mensual')
                    }
                },
                {
                    label: 'Planilla terapeuta mensual rotatorio',
                    icon: 'pi pi-file-export',
                    command: () => {
                        setReporte('planilla-terapeuta-mensual-rotatorio')
                    }
                },
                {
                    label: 'Reporte diaria',
                    icon: 'pi pi-chart-bar',
                    command: () => {
                        setReporte('reporte-diaria')
                    }
                },
                {
                    label: 'Separacion cita diario',
                    icon: 'pi pi-calendar-plus',
                    command: () => {
                        setReporte('separacion-cita-diario')
                    }
                },
            ]
        }
    ];
    
    return (
        <div className='w-full grid grid-cols-3 gap-4 mx-auto'>

            <div className="w-full">
                <Menu 
                    model={items} 
                    className='w-full text-2xl'
                />
            </div>
            <div className="w-full form1 col-span-2">
            {viewReporte(reporte)}
            </div>
        </div>
    );
}
export default Reportes                 