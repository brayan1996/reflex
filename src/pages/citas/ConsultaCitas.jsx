import { TabView, TabPanel } from 'primereact/tabview';
import { Calendar } from 'react-multi-date-picker';
import { Citas } from './components/Citas';
import { FormCreateCitas } from './components/FormCreateCitas';
import { useCalendar } from '../../hooks/useCalendar';
import gregorian_en_lowercase from '../../helpers/localeDatesCalendar';
import HistorialMedicoPersona from './components/HistorialMedicoPersona';
import { useState } from 'react';

export const ConsultaCitas = ({ pagina }) => {
  const { value, getNormalDate } = useCalendar();
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className='width-extra card'>
      <div className='mx-auto w-1/3'>
        <Calendar
          value={value}
          onChange={getNormalDate}
          locale={gregorian_en_lowercase}
          timeZone='UTC'
          format='DD/MM/YYYY'
          // plugins={[
          //  <DatePanel />
          // ]}
        />
      </div>
      <TabView
        className='mt-5'
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
      >
        <TabPanel
          header='Ver citas'
          rightIcon='pi pi-calendar'
          headerClassName='w-1/3 text-lg'
        >
          <Citas value={value} />
        </TabPanel>
        {!pagina && (
          <TabPanel
            header='Crear cita'
            rightIcon='pi pi-user-plus'
            headerClassName='w-1/3 text-lg'
          >
            <FormCreateCitas
              dateCalendar={value}
              setActiveIndex={setActiveIndex}
            />
          </TabPanel>
        )}
        <TabPanel
          header='Historial'
          rightIcon='pi pi-user-plus'
          headerClassName='w-1/3 text-lg'
        >
          <HistorialMedicoPersona />
        </TabPanel>
      </TabView>
    </div>
  );
};
