import React from 'react';

import './styles.scss';
import { useNavigate } from 'react-router-dom';
export default function AppMenu() {
  const navigate = useNavigate();
  let menu = [
    // {
    //   label: 'Archivos Maestros',
    //   items: [
    //     {
    //       label: 'Citas',
    //       icon: 'pi pi-fw pi-calendar-plus',
    //       to: '/citas',
    //       command: () => {
    //         navigate('/citas');
    //       }
    //     },
    //     {
    //       label: 'Enfermedades',
    //       icon: 'pi pi-fw pi-chart-bar',
    //       to: '/enfermedades',
    //       command: () => {
    //         navigate('/enfermedades');
    //       }
    //     },
    //     {
    //       label: 'Personas',
    //       icon: 'pi pi-fw pi-users',
    //       to: '/enfermedades',
    //       command: () => {
    //         navigate('/personas');
    //       }
    //     }
    //   ]
    // },
    {
      label: 'Archivos Maestros',
      items: [
        {
          label: 'Registro de pacientes',
          icon: 'pi pi-fw pi-calendar-plus',
          to: '/registro-pacientes',
          command: () => {
            navigate('/registro-pacientes');
          }
        },
        {
          label: 'Registro de terapeuta',
          icon: 'pi pi-fw pi-chart-bar',
          to: '/registro-terapeuta',
          command: () => {
            navigate('/registro-terapeuta');
          }
        },
        {
          label: 'Registro de diagnostico - internos',
          icon: 'pi pi-fw pi-users',
          to: '/resgistro-diagnostico',
          command: () => {
            navigate('/resgistro-diagnostico');
          }
        },
        {
          label: 'Registro de diagnostico - medicos',
          icon: 'pi pi-fw pi-users',
          to: '/registro-diagnostico-medico',
          command: () => {
            navigate('/registro-diagnostico-medico');
          }
        }
      ]
    },
    {
      label: 'Movimientos',
      items: [
        {
          label: 'Agenda de citas y cobranza',
          icon: 'pi pi-fw pi-calendar-plus',
          to: '/citas',
          command: () => {
            navigate('/citas');
          }
        },
        {
          label: 'Resultado de la consulta',
          icon: 'pi pi-fw pi-calendar-plus',
          to: '/citas',
          command: () => {
            navigate('/citas');
          }
        }
      ]
    },
    {
      label: 'Reportes',
      items: [
          {
            label: 'reportes',
            icon: 'pi pi-fw pi-calendar-plus',
            to: '/reportes',
            command: () => {
              navigate('/reportes');
            }
        },
        {
          label: 'Planilla terapeutas - resumen mensual permanente',
          icon: 'pi pi-fw pi-calendar-plus',
          to: '/planilla-terapeuta-mensual',
          command: () => {
            navigate('/planilla-terapeuta-mensual');
          }
        },
        {
          label: 'Datos de paciente',
          icon: 'pi pi-fw pi-calendar-plus',
          to: '/datos-paciente',
          command: () => {
            navigate('/datos-paciente');
          }
        },
        {
          label: 'Atención Diarias por terapeutas',
          icon: 'pi pi-fw pi-calendar-plus',
          to: '/atencion-diaria-terapeuta',
          command: () => {
            navigate('/atencion-diaria-terapeuta');
          }
        },
        {
          label: 'Reporte diarios - detallado',
          icon: 'pi pi-fw pi-calendar-plus',
          to: '/reporte-diaria',
          command: () => {
            navigate('/reporte-diaria');
          }
        },
        {
          label: 'Planilla terapeuta - resumen diario',
          icon: 'pi pi-fw pi-calendar-plus',
          to: '/planilla-terapeuta-diaria',
          command: () => {
            navigate('/planilla-terapeuta-diaria');
          }
        },
        {
          label: 'Separación cita por día detallado',
          icon: 'pi pi-fw pi-calendar-plus',
          to: '/separacion-cita-diario',
          command: () => {
            navigate('/separacion-cita-diario');
          }
        },
        {
          label: 'Cobranza - resumen diario',
          icon: 'pi pi-fw pi-calendar-plus',
          to: '/cobranza',
          command: () => {
            navigate('/cobranza');
          }
        },
        {
          label: 'Planilla terapeutas - resumen mensual rotatorio',
          icon: 'pi pi-fw pi-calendar-plus',
          to: '/planilla-terapeuta-mensual-rotatorio',
          command: () => {
            navigate('/planilla-terapeuta-mensual-rotatorio');
          }
        },
        {
          label: 'Atención diarias por paciente',
          icon: 'pi pi-fw pi-calendar-plus',
          to: '/atencion-diaria-paciente',
          command: () => {
            navigate('/atencion-diaria-paciente');
          }
        },
        {
          label: 'Estadistica - Atención de pacientes y resultados',
          icon: 'pi pi-fw pi-calendar-plus',
          to: '/estadistica-paciente-resultado',
          command: () => {
            navigate('/estadistica-paciente-resultado');
          }
        },
        {
          label: 'Estadistica - Atención de pacientes por sexo',
          icon: 'pi pi-fw pi-calendar-plus',
          to: '/estadistica-pacientes-sexo',
          command: () => {
            navigate('/estadistica-pacientes-sexo');
          }
        },
        {
          label: 'Estadistica - Atención de pacientes por edad',
          icon: 'pi pi-fw pi-calendar-plus',
          to: '/estadistica-pacientes-edad',
          command: () => {
            navigate('/estadistica-pacientes-edad');
          }
        }
      ]
    }
  ];

  return (
    <div className='layout-menu-container eliminar-li'>
      <ul className='layout-menu'>
        {menu
          ? menu.map((item, index) => {
              return (
                <div key={index}>
                  <li>
                    <p>{item.label}</p>
                  </li>
                  <ul>
                    {item.items
                      ? item.items.map((item2, index2) => {
                          return (
                            <li
                              key={index2}
                              className={'li'}
                              onClick={() => item2.command()}
                            >
                              <p key={index2}>
                                <i className={item2.icon}></i>
                                <span>{item2.label}</span>
                              </p>
                            </li>
                          );
                        })
                      : null}
                  </ul>
                </div>
              );
            })
          : null}
      </ul>
    </div>
  );
}
