import {  Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from "react-redux"
// import AppFooter from './Menu/AppFooter';
import AppMenu from './Menu/AppMenu';
import AppTopbar from './Menu/AppTopbar';
import { CSSTransition } from 'react-transition-group';
import { useState, useEffect } from 'react';
import { getAllDiseases } from '../../store/slices/enfermedades';
import { requestPersons } from '../../store/slices/personas';
import Loading from '../../components/loading/loading';
import './styles.scss';

export default function Home() {
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch( getAllDiseases() )
    dispatch( requestPersons() )
  }, [])
  return (
    <div>
      <AppTopbar />
      <div className='layout-sidebar'>
        <AppMenu />
      </div>

      <div className='layout-main-container'>
        <Suspense fallback={<Loading/>}>
          <div className='layout-main'>
            <Outlet />
          </div>
        </Suspense>
        {/* <AppFooter /> */}
      </div>
      <CSSTransition
        classNames='layout-mask'
        timeout={{ enter: 200, exit: 200 }}
        in={mobileMenuActive}
        unmountOnExit
      >
        <div className='layout-mask p-component-overlay'></div>
      </CSSTransition>
    </div>
  );
}
