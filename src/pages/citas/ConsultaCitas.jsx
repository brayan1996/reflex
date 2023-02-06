import { TabView, TabPanel } from 'primereact/tabview';
import  { Calendar } from "react-multi-date-picker";
import { Citas } from "./components/Citas";
import { FormCreateCitas } from './components/FormCreateCitas';
import { useCalendar } from "../../hooks/useCalendar";
import gregorian_en_lowercase from "../../helpers/localeDatesCalendar";
import HistorialMedicoPersona from './components/HistorialMedicoPersona';

export const ConsultaCitas = () => {
    
  const { value, getNormalDate } = useCalendar()
    return (
      <div className="w-full card">
        <div className='mx-auto w-1/3'>
          <Calendar
              value={value}
              onChange={getNormalDate}
              locale={gregorian_en_lowercase} 
              timeZone='UTC'
              format="DD/MM/YYYY"
              // plugins={[
              //  <DatePanel />
              // ]}
          />
        </div>
        <TabView className='mt-5'>
            <TabPanel header="Ver citas" rightIcon="pi pi-calendar"   headerClassName='w-1/3 text-lg'>
              <Citas
                value={value}
              />
            </TabPanel>
            <TabPanel header="Crear cita" rightIcon="pi pi-user-plus"  headerClassName='w-1/3 text-lg'>
              <FormCreateCitas
                dateCalendar={value}
              />
            </TabPanel>
            <TabPanel header="Historial" rightIcon="pi pi-user-plus" headerClassName='w-1/3 text-lg'>
             <HistorialMedicoPersona/>
            </TabPanel>
        </TabView>
      </div>
    );
}
