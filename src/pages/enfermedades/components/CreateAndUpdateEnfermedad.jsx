import { TabView, TabPanel } from 'primereact/tabview';
import UpdateDiseas from "./UpdateDiseas";

const CreateAndUpdateEnfermedad = ({selectedDiseases, isLoadingDiseases, updateDisease, createDisease}) => {
  return (
    <div className="w-full form1">
        <TabView className='mt-5'>
            <TabPanel header="Actualizar Enfermedad" rightIcon="pi pi-calendar"   headerClassName='w-1/2 text-lg'>
                <UpdateDiseas
                    title='Actualizar'
                    selectedDiseases={selectedDiseases}
                    isLoadingDiseases={isLoadingDiseases}
                    updateDisease={updateDisease}
                />
            </TabPanel>
            <TabPanel header="Crear Enfermedad" rightIcon="pi pi-user-plus"  headerClassName='w-1/2 text-lg'>
                <UpdateDiseas
                    title='Crear'
                    createDisease={createDisease}
                    isLoadingDiseases={isLoadingDiseases}
                />
            </TabPanel>
        </TabView>
    </div>
  )
}

export default CreateAndUpdateEnfermedad