import {  useSelector, useDispatch } from 'react-redux';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { selectAPerson, deleteAPerson } from '../../store/slices/personas';
import { Tablex } from '../../components/tablex/Tablex';
import { FormPersona } from './components/FormPersona';

const columnConfig = [
    {
      key: "nroDoc",
      name: "Código",
      width:'15%'
    },
    {
      key: "nombre",
      name: "Nombre",
      width:'50%'
    },
    {
      name: "Elimnar",
      customComponent: "tableButtonDelete",
      width:'10px'
    }
  ]

const PersonasPage = () => {
    const { dataPersons, dataAPerson } = useSelector( state => state.personas )
    const { direccionPersonal } = useSelector( state => state.direcciones )
    const dispatch = useDispatch()

    const select = ( person ) =>{
        dispatch( selectAPerson(person) )
    }

    const confirm1 = (id) => {
        confirmDialog({
          message: 'Esta seguro que desea eliminar?',
          header: 'Confirmar',
          icon: 'pi pi-exclamation-triangle',
          accept: () => dispatch( deleteAPerson(id) ),
        });
    };

    const tableButtonDelete = (rowData) => {
        return (
          <div className='actions'>
            <Button
              icon='pi pi-trash'
              className='p-button-rounded p-button-danger'
              onClick={() => {
                confirm1(rowData.id);
              }}
            />
          </div>
        );
      };
  return (
    <>
        <div className='w-full grid grid-cols-3 gap-4 mx-auto'>
        <ConfirmDialog />
          <div className="w-full form1 ">
            <Tablex
                tableConfig={columnConfig}
                tableButtonDelete={tableButtonDelete}
                data={dataPersons}
                selectionRow={select}
                scrollable
                heightScroll='450px'
            />
          </div>
          <div className="w-full form1 col-span-2">
            <TabView className='mt-5'>
                <TabPanel header="Actualizar Enfermedad" rightIcon="pi pi-calendar"   headerClassName='w-1/2 text-lg'>
                    <FormPersona
                        action='Actualizar'
                        dataAPerson={dataAPerson}
                        direccionPersonal={direccionPersonal}
                    />
                </TabPanel>
                <TabPanel header="Crear Enfermedad" rightIcon="pi pi-user-plus"  headerClassName='w-1/2 text-lg'>
                    <FormPersona
                        action='Crear'
                    />
                </TabPanel>
            </TabView>
        </div>
        </div>
    </>
  )
}

export default PersonasPage