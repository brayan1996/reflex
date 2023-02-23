import { useEffect, useState } from "react"
import { useField } from "./useField"
import useFieldChecked from './useFieldChecked';
import { provincias } from "../dataFalsa/departamentos";
import { distritos } from "../dataFalsa/departamentos";
import { changeFormateDate } from "../helpers/transformDates";

const useFieldFormPerson = ({numeroDocumento, dataAPerson}) => {
    //FALTA ADAPTAR EL NOMBRE DE LAS KEYS
    const [personaData, setPersonaData] = useState({})
    const [provinciasData, setProvinciasData] = useState([])
    const [distritosData, setDistritosData] = useState([])
    const [direccionData, setDireccionData] = useState({})
    const nroDoc = useField({type:'text',defaultValue:numeroDocumento || ''})
    const nombre = useField({type:'text'})
    const fechNac = useField({type:'date'})
    const sexo = useField({type:'text',keySelect:'code'})
    const dir = useField({type:'text'})
    const dep = useField({type:'text',keySelect:'IDDEPARTAM',defaultValue:14})
    const prov = useField({type:'text',keySelect:'IDPROVI',defaultValue:8})
    const dis = useField({type:'text', keySelect:'IDDISTRI',defaultValue:'15'})
    const resultado = useField({type:'text'})
    const telef = useField({type:'text'})
    const email = useField({type:'text'})
    const ocupacion = useField({type:'text'})
    const testimonio = useField({type:'text',keySelect:'code'})
    const observacion = useField({type:'text'})
    const especial= useFieldChecked({})

    useEffect(() => {
        if(dataAPerson){
          nroDoc.onChange(dataAPerson.nroDoc || '')
          nombre.onChange(dataAPerson.nombre || '')
          fechNac.onChange(changeFormateDate(dataAPerson.nacimiento) || '')
          sexo.onChange(dataAPerson.sexo || '')
          resultado.onChange(dataAPerson.resultado || '')
          telef.onChange(dataAPerson.telefono || '')
          email.onChange(dataAPerson.email || '')
          ocupacion.onChange(dataAPerson.ocupacion || '')
          testimonio.onChange(dataAPerson.testimonio || '')
          observacion.onChange(dataAPerson.observacion || '')
          especial.onChange(dataAPerson.especial || '')
          dir.onChange(dataAPerson.dir || '')
          dep.onChange(dataAPerson.dpto || '')
          prov.onChange(dataAPerson.prov || '')
          dis.onChange(dataAPerson.dist || '')
        }
    }, [dataAPerson])

    useEffect(() => {
        setPersonaData({
            nroDoc:nroDoc.value,
            nombre:nombre.value,
            nacimiento:changeFormateDate(fechNac.value),
            sexo:sexo.value,
            resultado:resultado.value,
            telefono:telef.value,
            email:email.value,
            ocupacion:ocupacion.value,
            testimonio:testimonio.value,
            observacion:observacion.value,
            especial:especial.checked
        })
    }, [nombre.value, fechNac.value, sexo.value, resultado.value, telef.value, email.value, ocupacion.value, testimonio.value, observacion.value, especial.checked])

    useEffect(() => {
        setDireccionData({
            dpto:dep.value,
            prov:prov.value,
            dist:dis.value,
            dir:dir.value
        })
    }, [dep.value, prov.value, dis.value, dir.value])

    useEffect(() => {
        const provinciasSeleccionadas = provincias.filter( provincia => provincia.IDDEPA === dep.value )
        setProvinciasData(provinciasSeleccionadas)
      }, [dep.value])
      
    useEffect(() => {
        const distritosSeleccionados = distritos.filter( distrito => distrito.IDPROVI === prov.value && distrito.IDDEPA === dep.value)
        setDistritosData(distritosSeleccionados)
    }, [prov.value, dep.value])

    return {
        personaData,
        provinciasData,
        distritosData,
        direccionData,
        nroDoc,
        nombre,
        fechNac,
        sexo,
        dir,
        dep,
        prov,
        dis,
        resultado,
        telef,
        email,
        ocupacion,
        testimonio,
        observacion,
        especial
    }
}

export default useFieldFormPerson