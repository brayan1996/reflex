import { useSelector, useDispatch } from "react-redux"
import { useField } from "../../../hooks/useField"
import { useEffect, useState } from "react"
import { updateDisease, createDisease } from "../../../store/slices/enfermedades"
import TopNamedInput from "../../../components/inputs/TopNamedInput/TopNamedInput"
import SaveAndCancelButtons from "../../../components/buttonsGeneral/SaveAndCancelButtons"

const UpdateDiseas = ({title}) => {
    const [diseasesData, setDiseasesData] = useState({})
    const code = useField({type:'text'})
    const name = useField({type:'text'})
    const type = useField({type:'text'})
    const { selectedDiseases, isLoadingDiseases } = useSelector( state => state.enfermedades )
    const dispatch = useDispatch()
    const handleCancel = () =>{
        code.onChange('')
        name.onChange('')
        type.onChange('')
    }

    const saveData = () =>{
        try {
            if(title === 'Actualizar') dispatch(updateDisease(selectedDiseases.id, diseasesData))
            else dispatch(createDisease(diseasesData))
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        setDiseasesData({
            code:code.value,
            name:name.value,
            type:type.value
        })
    }, [code.value, name.value, type.value])
    
    useEffect(() => {
        if(title === 'Actualizar'){
            code.onChange(selectedDiseases.code || '')
            name.onChange(selectedDiseases.name || '')
        }
    }, [selectedDiseases])
    
  return (
    <div>
        <div className="grid grid-cols-1 gap-4 w-3/5">
            <TopNamedInput
                {...code}
                label='Código'
            />
            <TopNamedInput
                {...name}
                label='Nombre'
            />
            <TopNamedInput
                {...type}
                label='Tipo'
            />
        </div>
        <SaveAndCancelButtons
            handleSave={saveData}
            handleCancel={handleCancel}
            loadingSave={isLoadingDiseases}
        />
    </div>
  )
}

export default UpdateDiseas