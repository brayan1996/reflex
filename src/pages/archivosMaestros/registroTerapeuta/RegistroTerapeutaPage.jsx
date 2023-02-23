import {  useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import PersonasPage from "../../personas/PersonasPage"
import { getTherapist, seleactATherapist, deleteTherapist, updateTherapist, createTherapist, requestTherapistTextSearch } from "../../../store/slices/terapeutas"
import { setVistaPagina } from '../../../store/slices/reactivos/reactivosSlice';
import { adaptKeys } from "../../../helpers/transformObjects"
import { changeKeysLocaltionToInteger } from '../../../helpers/transformArrays';

const columnConfig = [
  {
    key: "CARNET",
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
  "DIRECCION": "dir",
  "DPTO": "dpto",
  "PROV": "prov",
  "DISTRITO": "dist",
  "CARNET": "nroDoc",
  "TELF": "telefono",
  "EMAIL": "email",
}

const registroTerapeutaPage = () => {
  const dispatch = useDispatch()
  const { terapeutasData, ATherapist } = useSelector( state=> state.terapeutas )
  useEffect(() => {
    dispatch( getTherapist() )
    dispatch( setVistaPagina('registro_terapeuta') )
  }, [])
  
  return (
    <PersonasPage
      dataPersons={changeKeysLocaltionToInteger(terapeutasData,'DISTRITO')}
      dataAPerson={adaptKeys(ATherapist,keysValues)}
      deleteAPerson={deleteTherapist}
      selectAPerson={seleactATherapist}
      columnConfig={columnConfig}
      updateOnePerson={updateTherapist}
      createPerson={createTherapist}
      requestText={requestTherapistTextSearch}
      title='Terapeutas'
    />
  )
}

export default registroTerapeutaPage