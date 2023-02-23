
import { useDispatch, useSelector } from 'react-redux';
import useFieldFormPerson from "../../../hooks/useFieldFormPerson";
import TopNamedInput from "../../../components/inputs/TopNamedInput/TopNamedInput"
import TopNamedCombobox from "../../../components/inputs/TopNamedCombobox/TopNamedCombobox";
import CheckedComponent from "../../../components/inputs/checkedComponent/CheckedComponent";
import { gender } from "../../../helpers/conbobox";
import { departamentos } from "../../../dataFalsa/departamentos";
import { ocupaciones } from "../../../dataFalsa/ocupaciones";
import SaveAndCancelButtons from "../../../components/buttonsGeneral/SaveAndCancelButtons";

export const FormPersona = (props) => {
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
        } = useFieldFormPerson({numeroDocumento:props.numeroDocumento, dataAPerson:props.dataAPerson})
    const { loadingPersons } = useSelector( state => state.personas )
    const { vistaActual } = useSelector( state=>state.reactivos )
    const dispatch = useDispatch(); 
    const savePerson = () =>{
        if((!nroDoc.value || nroDoc.value ==='') && (!nombre.value || nombre.value ==='')){
            console.log('no existe')
            return
        } 
        if(props.action === 'Actualizar'){
            dispatch( props.updateOnePerson(props.dataAPerson.id,{...personaData, ...direccionData}) )
        }else{
            dispatch(props.createPerson({...personaData, ...direccionData}))
        }
        if(props.closeModal) props.closeModal()
    }

    const cancelSave = () =>{
        if(props.closeModal) props.closeModal()
    }
    
    
    
  return (
    <div className="w-full form1">
        <p className="title">{props.title || 'personas'}</p>
        <div className='w-10/12 mt-10 mx-auto grid grid-cols-3 gap-4'>
            <TopNamedInput
                {...nroDoc}
                label={vistaActual === 'registro_paciente' ? "DNI/CE" : "CARNET"}
                disabled={props.action === 'Actualizar'}
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
                dataKey="IDDEPARTAM"
                textField="DESCRDEPAR"
            /> 
            <TopNamedCombobox
                {...prov}
                label='Provincia'
                data={provinciasData}
                dataKey="IDPROVI"
                textField="DESCRPROVI"
            />
            <TopNamedCombobox
                {...dis}
                label='Distrito'
                data={distritosData}
                dataKey="IDDISTRI"
                textField="DESCRDISTR"
            />  
           { 
                vistaActual === 'registro_paciente' &&
                <TopNamedInput
                    {...resultado}
                    label='Resultado'
                />
            }
            <TopNamedInput
                {...telef}
                label='Telefono'
            />    
            <TopNamedInput
                {...email}
                label='Email'
            /> 
            {
                vistaActual === 'registro_paciente' &&
                <TopNamedInput
                    {...observacion}
                    label='Observacion'
                />
            }
           {
                vistaActual === 'registro_paciente' &&
                <CheckedComponent
                    {...especial}
                    label='Especial'
                />
            }
            {    
                vistaActual === 'registro_paciente' &&
                <TopNamedCombobox
                    {...testimonio}
                    label='Testimonio'
                    data={[{code:'f', name:'F'}]}
                    dataKey="code"
                    textField="name"
                /> 
            } 
            {
                vistaActual === 'registro_paciente' &&
                <TopNamedCombobox
                    {...ocupacion}
                    label='Ocupación'
                    data={ocupaciones}
                    dataKey="code"
                    textField="name"
                /> 
            }
        </div>
        <SaveAndCancelButtons
            handleSave={savePerson}
            handleCancel={cancelSave}
            loadingSave={loadingPersons}
        />
    </div>
  )
}
