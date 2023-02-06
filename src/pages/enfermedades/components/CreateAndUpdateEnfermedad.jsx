import { TabView, TabPanel } from 'primereact/tabview';
import UpdateDiseas from "./UpdateDiseas";

const CreateAndUpdateEnfermedad = () => {
  return (
    <div className="w-full form1">
        <TabView className='mt-5'>
            <TabPanel header="Actualizar Enfermedad" rightIcon="pi pi-calendar"   headerClassName='w-1/2 text-lg'>
                <UpdateDiseas
                    title='Actualizar'
                />
            </TabPanel>
            <TabPanel header="Crear Enfermedad" rightIcon="pi pi-user-plus"  headerClassName='w-1/2 text-lg'>
                <UpdateDiseas
                    title='Crear'
                />
            </TabPanel>
        </TabView>
    </div>
  )
}

export default CreateAndUpdateEnfermedad