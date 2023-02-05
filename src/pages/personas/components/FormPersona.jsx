
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createDirectionPersonal } from "../../../store/slices/direcciones/thunks";
import { createPerson } from "../../../store/slices/personas";
import useFieldFormPerson from "../../../hooks/useFieldFormPerson";
import TopNamedInput from "../../../components/inputs/TopNamedInput/TopNamedInput"
import TopNamedCombobox from "../../../components/inputs/TopNamedCombobox/TopNamedCombobox";
import CheckedComponent from "../../../components/inputs/checkedComponent/CheckedComponent";
import { gender } from "../../../helpers/conbobox";
import { departamentos } from "../../../dataFalsa/departamentos";
import { ocupaciones } from "../../../dataFalsa/ocupaciones";
import SaveAndCancelButtons from "../../../components/buttonsGeneral/SaveAndCancelButtons";

export const FormPersona = ({nroDoc:numeroDocumento, closeModal}) => {
    const {  
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
        } = useFieldFormPerson({numeroDocumento})
    const { loadingPersons } = useSelector( state => state.personas )
    const dispatch = useDispatch(); 
    const savePerson = () =>{
        dispatch(createPerson(personaData))
        dispatch( createDirectionPersonal(direccionData) )
        closeModal()
    }

    const cancelSave = () =>{
        closeModal()
    }
    
    
    
  return (
    <div className="w-full form1">
        <p className="title">Formulario persona</p>
        <div className='w-10/12 mt-10 mx-auto grid grid-cols-3 gap-4'>
            <TopNamedInput
                {...nroDoc}
                label='DNI/CE'
                disabled
            />
            <TopNamedInput
                {...nombre}
                label='Nombre'
            />    
            <TopNamedInput
                {...fechNac}
                label='Fecha Nacimiento'
            /> 
            <TopNamedCombobox
                {...sexo}
                label='Sexo'
                data={gender()}
                dataKey="code"
                textField="name"
            />    
            <TopNamedInput
                {...dir}
                label='Dirección'
            /> 
            <TopNamedCombobox
                {...dep}
                label='Departamento'
                data={departamentos}
                dataKey="dptoCode"
                textField="nombre"
            />    
            <TopNamedCombobox
                {...prov}
                label='Provincia'
                data={provinciasData}
                dataKey="provCode"
                textField="nombre"
            /> 
            <TopNamedCombobox
                {...dis}
                label='Distrito'
                data={distritosData}
                dataKey="distCode"
                textField="nombre"
            />    
            <TopNamedInput
                {...resultado}
                label='Resultado'
            />
            <TopNamedInput
                {...telef}
                label='Telefono'
            />    
            <TopNamedInput
                {...email}
                label='Email'
            /> 
            <TopNamedInput
                {...observacion}
                label='Observacion'
            />
            <CheckedComponent
                {...especial}
                label='Especial'
            />
            <TopNamedCombobox
                {...testimonio}
                label='Testimonio'
                data={[{code:'f', name:'F'}]}
                dataKey="code"
                textField="name"
            />  
            <TopNamedCombobox
               {...ocupacion}
               label='Ocupación'
               data={ocupaciones}
               dataKey="code"
               textField="name"
            /> 
        </div>
        <SaveAndCancelButtons
            handleSave={savePerson}
            handleCancel={cancelSave}
            loadingSave={loadingPersons}
        />
    </div>
  )
}
