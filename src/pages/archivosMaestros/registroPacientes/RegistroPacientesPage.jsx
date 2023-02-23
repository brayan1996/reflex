import {  useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import PersonasPage from "../../personas/PersonasPage"
import { getPatient, deletePatient, updatePatient, createPatient, seleactAPatient, requestPatientsTextSearch } from '../../../store/slices/pacientes';
import { setVistaPagina } from '../../../store/slices/reactivos/reactivosSlice';
import { adaptKeys } from "../../../helpers/transformObjects"
import { changeKeysLocaltionToInteger } from '../../../helpers/transformArrays';
const columnConfig = [
  {
    key: "DNI",
    name: "Código",
    width:'15%'
  },
  {
    key: "NOMBRE",
    name: "Nombre",
    width:'50%'
  },
  {
    name: "Elimnar",
    customComponent: "tableButtonDelete",
    width:'10px'
  }
]
const keysValues=  {
  "NOMBRE": "nombre",
  "FECNAC": 'nacimiento',
  "SEXO": "sexo",
  "DIRECC": "dir",
  "DPTO": "dpto",
  "PROV": "prov",
  "DIST": "dist",
  "DNI": "nroDoc",
  "TELF": "telefono",
  "EMAIL": "email",
  "OCUPACION":"ocupacion",
  "OBSERVA":"observacion",
  "TESTIMONIO":"testimonio",
  "RESULTADO":"resultado",
}
const registroPacientesPage = () => {
  const dispatch = useDispatch()
  const { patientsData, APatient } = useSelector( state=>state.pacientes )
  useEffect(() => {
    dispatch( getPatient() )
    dispatch(setVistaPagina('registro_paciente'))
  }, [])
  return (
    <PersonasPage
      dataPersons={changeKeysLocaltionToInteger(patientsData,'DIST')}
      dataAPerson={adaptKeys(APatient,keysValues)}
      deleteAPerson={deletePatient}
      selectAPerson={seleactAPatient}
      columnConfig={columnConfig}
      updateOnePerson={updatePatient}
      createPerson={createPatient}
      requestText={requestPatientsTextSearch}
      title='Pacientes'
    />
  )
}

export default registroPacientesPage