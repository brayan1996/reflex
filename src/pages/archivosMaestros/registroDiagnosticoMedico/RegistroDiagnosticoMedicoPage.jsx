import { useDispatch, useSelector } from "react-redux"
import { EnfermedadesPage } from "../../enfermedades/EnfermedadesPage"
import { getAllDiagnosis, selectADiagnosis, deleteDiagnosis, updateDiagnosis, createDiagnosis } from "../../../store/slices/diagnosticoMedico"
import { useEffect } from "react"
import { adaptKeys } from "../../../helpers/transformObjects"

const columnConfig = [
  {
    key: "CODIGO",
    name: "Código",
    width:'30%',
    "filter": true
  },
  {
    key: "NOMBRE",
    name: "Nombre",
    width:'50%',
    "filter": true
  },
  {
    name: "Elimnar",
    customComponent: "tableButtonDelete",
    width:'60px'
  }
]
const registroDiagnosticoMedicoPage = () => {
  const dispatch = useDispatch()
  const {allDiagnosis, aDiagnosis, loadingDiagnosis} = useSelector( state=>state.diagnosticoMedico )
  useEffect(() => {
    dispatch(getAllDiagnosis())
  }, [])
  const keysValues= {CODIGO:'code', NOMBRE:'name'}
  return (
    <div>
    <p>Registro de diagnostico medico interno</p>
    <EnfermedadesPage
      diseasesAllData={allDiagnosis}
      columnConfig={columnConfig}
      setDiseasesSelected={selectADiagnosis}
      deleteDisease={deleteDiagnosis}
      selectedDiseases={adaptKeys(aDiagnosis, keysValues)}
      isLoadingDiseases={loadingDiagnosis}
      updateDisease={updateDiagnosis}
      createDisease={createDiagnosis}
    />
  </div>
  )
}

export default registroDiagnosticoMedicoPage