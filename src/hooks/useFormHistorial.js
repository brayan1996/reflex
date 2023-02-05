import { useEffect, useState } from "react"
import { useSelector } from 'react-redux';
import { useField } from "./useField"
import useFieldChecked from './useFieldChecked';
const useFormHistorial = () => {
  const [historialData, setHistorialData] = useState({})
    const mestruacion = useFieldChecked({})
    const gestacion = useFieldChecked({})
    const testimonio = useFieldChecked({})
    const dolencias = useField({type:'text'})
    const codigo = useField({type:'text'})
    const nombre = useField({type:'text'})
    const terapeuta = useField({type:'text'})
    const diagExt = useField({type:'text'})
    const medicamentos = useField({type:'text'})
    const anticoceptivos = useField({type:'text'})
    const operaciones = useField({type:'text'})
    const observaciones = useField({type:'text'})
    const diagReflex = useField({type:'text'}) 
    const pesoInicial = useField({type:'number'})
    const pesoFinal = useField({type:'number'})
    const fechaInicial = useField({type:'date'})
    const fechaFinal = useField({type:'date'})
    const talla = useField({type:'number'})
    const diagnostico1 = useField({type:'text'})
    const diagnostico2 = useField({type:'text'})
    const diagnostico3 = useField({type:'text'})
    const diagnostico4 = useField({type:'text'})
    const diagnostico5 = useField({type:'text'})
    const diagnostico6 = useField({type:'text'})
    const bsPriv = useField({type:'text'})
    const resultado = useField({type:'text'})
    const obsGenerales = useField({type:'text'})
    const { historialSelected } = useSelector( state => state.historial )
    const deleteAllFieldsValues = () =>{
      mestruacion.onChange(false)
      gestacion.onChange(false)
      testimonio.onChange(false)
      dolencias.onChange('')
      codigo.onChange('')
      nombre.onChange('')
      terapeuta.onChange('')
      diagExt.onChange('')
      medicamentos.onChange('')
      anticoceptivos.onChange('')
      operaciones.onChange('')
      observaciones.onChange('')
      diagReflex.onChange('')
      pesoInicial.onChange('')
      pesoFinal.onChange('')
      fechaInicial.onChange('')
      fechaFinal.onChange('')
      talla.onChange('')
      diagnostico1.onChange('')
      diagnostico2.onChange('')
      diagnostico3.onChange('')
      diagnostico4.onChange('')
      diagnostico5.onChange('')
      diagnostico6.onChange('')
      bsPriv.onChange('')
      resultado.onChange('')
      obsGenerales.onChange('')
    }
    useEffect(() => {
      nombre.onChange(historialSelected.name || '')
      mestruacion.onChange(historialSelected.menstruation || '')
      gestacion.onChange(historialSelected.gestation || '')
      testimonio.onChange(historialSelected.testimony || '')
      dolencias.onChange(historialSelected.ailments || '')
      codigo.onChange(historialSelected.code || '')
      nombre.onChange(historialSelected.name || '')
      terapeuta.onChange(historialSelected.therapist || '')
      diagExt.onChange(historialSelected.diagExt || '')
      medicamentos.onChange(historialSelected.medicines || '')
      anticoceptivos.onChange(historialSelected.contraceptives || '')
      operaciones.onChange(historialSelected.operation || '')
      observaciones.onChange(historialSelected.observation || '')
      diagReflex.onChange(historialSelected.diagReflex || '')
      pesoInicial.onChange(historialSelected.startingWeight || '')
      pesoFinal.onChange(historialSelected.finalWeight || '')
      fechaInicial.onChange(historialSelected.startDate || '')
      fechaFinal.onChange(historialSelected.finalDate || '')
      talla.onChange(historialSelected.size || '')
      diagnostico1.onChange(historialSelected.diagnosis1 || '')
      diagnostico2.onChange(historialSelected.diagnosis2 || '')
      diagnostico3.onChange(historialSelected.diagnosis3 || '')
      diagnostico4.onChange(historialSelected.diagnosis4 || '')
      diagnostico5.onChange(historialSelected.diagnosis5 || '')
      diagnostico6.onChange(historialSelected.diagnosis6 || '')
      bsPriv.onChange(historialSelected.bsPriv || '')
      resultado.onChange(historialSelected.result || '')
      obsGenerales.onChange(historialSelected.obsGenerales || '')
    }, [historialSelected])
    
    useEffect(() => {
      setHistorialData({
        nroDoc:historialSelected.nroDoc,
        menstruation:mestruacion.checked,
        gestation:gestacion.checked,
        testimony:testimonio.checked,
        ailments:dolencias.value,
        code:codigo.value,
        name:nombre.value,
        therapist:terapeuta.value,
        diagExt:diagExt.value,
        medicines:medicamentos.value,
        contraceptives:anticoceptivos.value,
        operation:operaciones.value,
        observation:observaciones.value,
        diagReflex:diagReflex.value,
        startingWeight:pesoInicial.value,
        finalWeight:pesoFinal.value,
        startDate:fechaInicial.value,
        finalDate:fechaFinal.value,
        size:talla.value,
        diagnosis1:diagnostico1.value,
        diagnosis2:diagnostico2.value,
        diagnosis3:diagnostico3.value,
        diagnosis4:diagnostico4.value,
        diagnosis5:diagnostico5.value,
        diagnosis6:diagnostico6.value,
        bsPriv:bsPriv.value,
        result:resultado.value,
        obsGenerales:obsGenerales.value
      })
    }, [
      historialSelected,
      mestruacion.checked,
      gestacion.checked,
      testimonio.checked,
      dolencias.value,
      codigo.value,
      nombre.value,
      terapeuta.value,
      diagExt.value,
      medicamentos.value,
      anticoceptivos.value,
      operaciones.value,
      observaciones.value,
      diagReflex.value,
      pesoInicial.value,
      pesoFinal.value,
      fechaInicial.value,
      fechaFinal.value,
      talla.value,
      diagnostico1.value,
      diagnostico2.value,
      diagnostico3.value,
      diagnostico4.value,
      diagnostico5.value,
      diagnostico6.value,
      bsPriv.value,
      resultado.value,
      obsGenerales.value
    ])

  return {
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
  }
}

export default useFormHistorial