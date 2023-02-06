import { useEffect, useState } from "react"
import { useField } from "./useField"
import useFieldChecked from './useFieldChecked';
import { provincias } from "../dataFalsa/departamentos";
import { distritos } from "../dataFalsa/departamentos";
import { changeFormateDate } from "../helpers/transformDates";

const useFieldFormPerson = ({numeroDocumento, dataAPerson, direccionPersonal}) => {
    const [personaData, setPersonaData] = useState({})
    const [provinciasData, setProvinciasData] = useState([])
    const [distritosData, setDistritosData] = useState([])
    const [direccionData, setDireccionData] = useState({})
    const nroDoc = useField({type:'text',defaultValue:numeroDocumento || ''})
    const nombre = useField({type:'text'})
    const fechNac = useField({type:'date'})
    const sexo = useField({type:'text',keySelect:'code'})
    const dir = useField({type:'text'})
    const dep = useField({type:'text',keySelect:'dptoCode'})
    const prov = useField({type:'text',keySelect:'provCode'})
    const dis = useField({type:'text', keySelect:'distCode'})
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
        }
    }, [dataAPerson])
    
    useEffect(() => {
        if(direccionPersonal){
            dir.onChange(direccionPersonal.dir)
            dep.onChange(direccionPersonal.dpto)
            prov.onChange(direccionPersonal.prov)
            dis.onChange(direccionPersonal.dist)
        }else{
            dir.onChange('')
            dep.onChange('')
            prov.onChange('')
            dis.onChange('')
        }
    }, [direccionPersonal])

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
            dir:dir.value,
            docPersona:nroDoc.value
        })
    }, [dep.value, prov.value, dis.value, dir.value, nroDoc.value])

    useEffect(() => {
        const provinciasSeleccionadas = provincias.filter( provincia => provincia.dptoCode === dep.value )
        setProvinciasData(provinciasSeleccionadas)
       
      }, [dep.value])
      
    useEffect(() => {
        const distritosSeleccionados = distritos.filter( distrito => distrito.provCode === prov.value && distrito.dptoCode === dep.value)
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