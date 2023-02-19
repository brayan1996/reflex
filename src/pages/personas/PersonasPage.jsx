import { useDispatch } from 'react-redux';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Tablex } from '../../components/tablex/Tablex';
import { FormPersona } from './components/FormPersona';


const PersonasPage = (props) => {
    const dispatch = useDispatch()

    const select = ( person ) =>{
        dispatch( props.selectAPerson(person) )
    }

    const confirm1 = (id) => {
        confirmDialog({
          message: 'Esta seguro que desea eliminar?',
          header: 'Confirmar',
          icon: 'pi pi-exclamation-triangle',
          accept: () => dispatch( props.deleteAPerson(id) ),
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
                tableConfig={props.columnConfig}
                tableButtonDelete={tableButtonDelete}
                data={props.dataPersons}
                selectionRow={select}
                scrollable
                heightScroll='450px'
            />
          </div>
          <div className="w-full form1 col-span-2">
            <TabView className='mt-5'>
                <TabPanel header="Actualizar Persona" rightIcon="pi pi-user-plus"   headerClassName='w-1/2 text-lg'>
                    <FormPersona
                        action='Actualizar'
                        dataAPerson={props.dataAPerson}
                        updateOnePerson={props.updateOnePerson}
                    />
                </TabPanel>
                <TabPanel header="Crear Persona" rightIcon="pi pi-user"  headerClassName='w-1/2 text-lg'>
                    <FormPersona
                        action='Crear'
                        createPerson={props.createPerson}
                    />
                </TabPanel>
            </TabView>
        </div>
        </div>
    </>
  )
}

export default PersonasPage