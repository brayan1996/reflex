import { Link }               from 'react-router-dom';
import DropdawnTiredMenu      from './components/DropdawnTiredMenu';


export default function AppTopbar() {

  return (
    <div className='layout-topbar '>
      <Link to='/Dashboard' className='layout-topbar-logo'>
        <span>Gestión de rendiciones</span>
      </Link>
      <button
        type='button'
        className='p-link  layout-menu-button layout-topbar-button'
      >
        <i className='pi pi-bars' />
      </button>
      <button
        type='button'
        className='p-link layout-topbar-menu-button layout-topbar-button'
      >
        <i className='pi pi-ellipsis-v' />
      </button>
      <ul
        className='layout-topbar-menu lg:flex origin-top'
      >
        <li>
          <button
            className='p-link layout-topbar-button'
          >
            <i className='pi pi-cog' />
            <span>Settings</span>
          </button>
        </li>
        <DropdawnTiredMenu/>
      </ul>
    </div>
  );
}
