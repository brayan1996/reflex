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
          to: '/resultado-consulta',
          command: () => {
            navigate('/resultado-consulta');
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
                    <p className='font-bold'>{item.label}</p>
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
