import { useDispatch, useSelector } from "react-redux"
import { EnfermedadesPage } from "../../enfermedades/EnfermedadesPage"
import { getAllDiagnosis, selectADiagnosis, deleteDiagnosis, updateDiagnosis, createDiagnosis } from "../../../store/slices/diagnosticoMedicoInterno"
import { useEffect } from "react"
import { adaptKeys } from "../../../helpers/transformObjects"

const columnConfig = [
  {
    key: "CODIGO",
    name: "Código",
    width:'25%',
    "filter": true
  },
  {
    key: "DESCRIP1",
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
const resgistroDiagnosticoPage = () => {
  const dispatch = useDispatch()
  const {allDiagnosis, aDiagnosis, loadingDiagnosis} = useSelector( state=>state.diagnosticoInterno )
  useEffect(() => {
    dispatch(getAllDiagnosis())
  }, [])
  const keysValues= {CODIGO:'code', DESCRIP1:'name'}
  return (
    <div>
      <p>Registro de diagnostico interno</p>
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

export default resgistroDiagnosticoPage