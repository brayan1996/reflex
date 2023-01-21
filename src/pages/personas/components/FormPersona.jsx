
import { useField } from "../../../hooks/useField"
import TopNamedInput from "../../../components/inputs/TopNamedInput/TopNamedInput"
import { Button } from "primereact/button";
import { useEffect, useState } from "react";

export const FormPersona = () => {
    const [personaData, setPersonaData] = useState({})
    const [direccionData, setDireccionData] = useState({})
    const nroDoc = useField({type:'text'})
    const nombre = useField({type:'text'})
    const fechNac = useField({type:'text'})
    const sexo = useField({type:'text'})
    const dir = useField({type:'text'})
    const dep = useField({type:'text'})
    const prov = useField({type:'text'})
    const dis = useField({type:'text'})
    const carnet = useField({type:'text'})
    const telef = useField({type:'text'})
    const email = useField({type:'text'})
    useEffect(() => {
        setPersonaData({
            nroDoc:nroDoc.value,
            nombre:nombre.value,
            nacimiento:fechNac.value,
            sexo:sexo.value,
            carnet:carnet.value,
            telefono:telef.value,
            email:email.value
        })
    }, [nombre, fechNac, sexo, carnet, telef, email])
    
  return (
    <div className="w-full form1">
        <p className="title">Formulario persona</p>
        <div className='mt-10 mx-auto grid grid-cols-3 gap-4'>
            <TopNamedInput
                {...nroDoc}
                label='Nro Doc'
            />
            <TopNamedInput
                {...nombre}
                label='Nombre'
            />    
            <TopNamedInput
                {...fechNac}
                label='Fecha Nacimiento'
            /> 
            <TopNamedInput
                {...sexo}
                label='Sexo'
            />    
            <TopNamedInput
                {...dir}
                label='Dirección'
            /> 
            <TopNamedInput
                {...dep}
                label='Departamento'
            />    
            <TopNamedInput
                {...prov}
                label='Provincia'
            /> 
            <TopNamedInput
                {...dis}
                label='Distrito'
            />    
            <TopNamedInput
                {...carnet}
                label='Carnet'
            />
            <TopNamedInput
                {...telef}
                label='Telefono'
            />    
            <TopNamedInput
                {...email}
                label='Email'
            /> 
        </div>
        <div className="grid grid-cols-2 gap-4 w-1/2 mx-auto">
            <Button
                label="Cancelar"
                className="p-button-outlined p-button-danger"
                icon="pi pi-times"
            />
            <Button
                label="Guardar"
                className="p-button-outlined"
                icon="pi pi-check"
            />
        </div>
    </div>
  )
}
