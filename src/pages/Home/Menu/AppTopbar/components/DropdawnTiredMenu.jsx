import { useRef }             from 'react';
import { TieredMenu }         from 'primereact/tieredmenu';
import { useDispatch }        from 'react-redux';
import { Toast }              from 'primereact/toast';
import { logout }             from '../../../../../store/slices/users/userSlice';
import { ToastrComponent }    from '../../../../../components/toast/Toastr.jsx';

const DropdawnTiredMenu = () => {
    const menu        = useRef(null);
    const dispatch    = useDispatch()
    const { toastSC, showConfirm } = ToastrComponent()
  
    const handleSucces = () =>dispatch(logout())
    const items = [
      {
          label:'Salir',
          icon:'pi pi-fw pi-power-off',
          command:()=>{ 
            showConfirm({messageTitle:'¿Desea salir?', handleSucces})
           }
      }
    ];
  return (
    <li>
          <Toast ref={toastSC} />
          <TieredMenu model={items} popup ref={menu} id="overlay_tmenu" />
          <button
            className='p-link layout-topbar-button'
            onClick={(event) => menu.current.toggle(event)} 
            aria-haspopup aria-controls="overlay_tmenu"
          >
            <i className='pi pi-user' />
            <span>Profile</span>
          </button>
    </li>
  )
}

export default DropdawnTiredMenu