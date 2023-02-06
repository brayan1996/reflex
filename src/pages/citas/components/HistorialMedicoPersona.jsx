import { useSelector, useDispatch } from 'react-redux';
import { createHistorial, updateHistorial } from '../../../store/slices/historial';
import { modifyDate } from "../../../store/slices/citas";
import InputTextArea from '../../../components/inputs/topNamedTextArea/InputTextArea';
import TopNamedInput from "../../../components/inputs/TopNamedInput/TopNamedInput"
import TopNamedCombobox from "../../../components/inputs/TopNamedCombobox/TopNamedCombobox";
import CheckedComponent from '../../../components/inputs/checkedComponent/CheckedComponent';
import SaveAndCancelButtons from '../../../components/buttonsGeneral/SaveAndCancelButtons';
import useFormHistorial from '../../../hooks/useFormHistorial';
import { terapeutas } from '../../../dataFalsa/therapist';

const HistorialMedicoPersona = () => {
  const { isExist, isLoadingHistorial, historialSelected } = useSelector( state => state.historial )
  const { diseasesAllData } = useSelector( state => state.enfermedades )
  const { citaSelected } = useSelector( state => state.citas )
  console.log("🚀 ~ file: HistorialMedicoPersona.jsx:15 ~ HistorialMedicoPersona ~ citaSelected", citaSelected)
  const dispatch = useDispatch(); 
  const {
    deleteAllFieldsValues,
    historialData,
    mestruacion,
    gestacion,
    testimonio,
    dolencias,
    codigo,
    nombre,
    terapeuta,
    diagExt,
    medicamentos,
    anticoceptivos,
    operaciones,
    observaciones,
    diagReflex,
    pesoInicial,
    pesoFinal,
    fechaInicial,
    fechaFinal,
    talla,
    diagnostico1,
    diagnostico2,
    diagnostico3,
    diagnostico4,
    diagnostico5,
    diagnostico6,
    bsPriv,
    resultado,
    obsGenerales
  } = useFormHistorial()
  const saveHistorial = () =>{
    if(isExist) dispatch( updateHistorial(historialData) )
    else dispatch( createHistorial(historialData) )
    if(!citaSelected.therapist) dispatch( modifyDate({...citaSelected,therapist:terapeuta.value}) )
  }
  return (
    <div className="w-full form1">
      <p className="title">Historial Medico</p>
      {historialSelected.name 
      ? <div>
        <div className='w-full mt-10 mx-auto grid grid-cols-3 gap-4'>
          <TopNamedInput
            label='Código'
            {...codigo}
          />
          <TopNamedInput
            label='Nombre'
            {...nombre}
          />
          <TopNamedCombobox
            label='Terapeuta'
            data={terapeutas}
            dataKey="code"
            textField="name"
            disabled={citaSelected.therapist}
            {...terapeuta}
          />
          <InputTextArea
            label='Diagnostico externo'
            {...diagExt}
            height='60px'
          />
          <InputTextArea
            label='Medicamentos'
            {...medicamentos}
            height='60px'
          />
          <InputTextArea
            {...anticoceptivos}
            label='Anticoceptivos'
            height='60px'
          />
          <InputTextArea
            {...operaciones}
            label='Operaciones'
            height='60px'
          />
          <InputTextArea
            {...observaciones}
            label='Observaciones'
            height='60px'
          />
          <div></div>
          <InputTextArea
            {...dolencias}
            label='Sus dolencias'
            height='90px'
          />
          <InputTextArea
            {...diagReflex}
            label='Diagnostico reflex'
            height='90px'
          />
          <InputTextArea
            {...bsPriv}
            label='BS priv'
            height='90px'
          />
        </div>
        <div className='w-full mx-auto grid grid-cols-5 gap-4'>
          <TopNamedInput
            {...pesoInicial}
            label='Peso inicial'
            type='number'
            step="0.1"
          />
          <TopNamedInput
            {...pesoFinal}
            label='Peso final'
            type='number'
            step="0.1"
          />
          <TopNamedInput
            {...fechaInicial}
            label='Fecha inicial'
            type='date'
          />
          <TopNamedInput
            {...fechaFinal}
            label='Fecha final'
            type='date'
          />
          <TopNamedInput
            {...talla}
            label='Talla'
            type='number'
            step="0.1"
          />
        </div>
        <div className='w-full mx-auto grid grid-cols-3 gap-4'>
          <CheckedComponent
            label='Mestruación'
            {...mestruacion}
          />
          <CheckedComponent
            label='Gestación'
            {...gestacion}
          />
          <CheckedComponent
            label='Testimonio'
            {...testimonio}
          />
          <TopNamedCombobox
            {...diagnostico1}
            label='Diagnostico Medico 1'
            data={diseasesAllData}
            dataKey="code"
            textField="name"
          />
          <TopNamedCombobox
            {...diagnostico2}
            label='Diagnostico Medico 2'
            data={diseasesAllData}
            dataKey="code"
            textField="name"
          />
          <TopNamedCombobox
            {...diagnostico3}
            label='Diagnostico Medico 3'
            data={diseasesAllData}
            dataKey="code"
            textField="name"
          />
          <TopNamedCombobox
            {...diagnostico4}
            label='Diagnostico Medico 4'
            data={diseasesAllData}
            dataKey="code"
            textField="name"
          />
          <TopNamedCombobox
            {...diagnostico5}
            label='Diagnostico Medico 5'
            data={diseasesAllData}
            dataKey="code"
            textField="name"
          />
          <TopNamedCombobox
            {...diagnostico6}
            label='Diagnostico Medico 6'
            data={diseasesAllData}
            dataKey="code"
            textField="name"
          />
        </div>
        <div className='w-full mx-auto grid grid-cols-2 gap-4'>
          <InputTextArea
            {...resultado}
            label='Resultado'
          />
          <InputTextArea
            {...obsGenerales}
            label='Observaciones'
          />
        </div>
        <SaveAndCancelButtons
          handleSave={saveHistorial}
          handleCancel={deleteAllFieldsValues}
          loadingSave={isLoadingHistorial}
        />
      </div>
      : <p className='text-red-600 text-center text-lg font-bold'>POR FAVOR SELECCIONE UNA PERSONA QUE ESTE REGISTRADA EN LA LISTA DE CITAS </p>}
    </div>
  )
}

export default HistorialMedicoPersona