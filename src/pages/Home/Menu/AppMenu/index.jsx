import React from 'react';

import './styles.scss';
import { useNavigate } from 'react-router-dom';
export default function AppMenu() {
  const navigate = useNavigate();
  let menu = [
    {
      label: 'Archivos Maestros',
      items: [
        {
          label: 'Citas',
          icon: 'pi pi-fw pi-chart-bar',
          to: '/citas',
          command: () => {
            navigate('/citas');
          }
        },
        {
          label: 'Enfermedades',
          icon: 'pi pi-fw pi-chart-bar',
          to: '/enfermedades',
          command: () => {
            navigate('/enfermedades');
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
