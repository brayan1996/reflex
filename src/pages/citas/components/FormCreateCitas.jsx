import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import TopNamedInput from "../../../components/inputs/TopNamedInput/TopNamedInput"
import { useField } from "../../../hooks/useField"
import { createDate } from "../../../store/slices/citas";
import { setPatientCreate } from "../../../store/slices/pacientes";
import { changeFormateDate } from "../../../helpers/transformDates";
import Pacientes from "../../../apis/Pacientes";
import FormPersonaModal from "./FormPersonaModal";
import TopNamedCombobox from "../../../components/inputs/TopNamedCombobox/TopNamedCombobox";
import useFieldChecked from "../../../hooks/useFieldChecked";
import CheckedComponent from "../../../components/inputs/checkedComponent/CheckedComponent";

const tarifaCitaOptions = [
    {code:'ct',name:'Cancela todo'},
    {code:'s',name:'Social'},
    {code:'v',name:'Vale'},
    {code:'mt',name:'Media tarifa'},
    {code:'r',name:'Reserva'}]
  
const tarifaAdelantoOptions =[
    {code:'a20',name:'Adelanto 20'},
    {code:'a30',name:'Adelanto 30'},
    {code:'r',name:'Reserva'},
] 

const hoursDate = [
    {hour:'7:00 AM', value:'7:00'},
    {hour:'7:30 AM', value:'7:30'},
    {hour:'8:00 AM', value:'8:00'},
    {hour:'8:30 AM', value:'8:30'},
    {hour:'9:00 AM', value:'9:00'},
    {hour:'9:30 AM', value:'9:30'},
    {hour:'10:00 AM', value:'10:00'},
    {hour:'10:30 AM', value:'10:30'},
    {hour:'11:00 AM', value:'11:00'},
    {hour:'11:30 AM', value:'11:30'},
    {hour:'12:00 M', value:'12:00'},
    {hour:'12:30 PM', value:'12:30'},
    {hour:'1:00 PM', value:'13:00'},
    {hour:'1:30 PM', value:'13:30'},
    {hour:'2:00 PM', value:'14:00'},
    {hour:'2:30 PM', value:'14:30'},
    {hour:'3:00 PM', value:'15:00'},
    {hour:'3:30 PM', value:'15:30'},
    {hour:'4:00 PM', value:'16:00'},
    {hour:'4:30 PM', value:'16:30'},
    {hour:'5:00 PM', value:'17:00'},
    {hour:'5:30 PM', value:'17:30'},
    {hour:'6:00 PM', value:'18:00'},
    {hour:'6:30 PM', value:'18:30'},
    {hour:'7:00 PM', value:'19:00'},
    {hour:'7:30 PM', value:'19:30'},
  ]
const d = new Date()
const fechaActualValue= `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${('0' + d.getDate()).slice(-2)}`

export const FormCreateCitas = ({dateCalendar}) => {
    const [time, setTime] = useState({fecha:'',hora:''})
    const [cita, setCita] = useState({})
    const [numeroDocumento, setNumeroDocumento] = useState('')
    const [hora, setHora] = useState('7:00')
    const [isOpen, setIsOpen] = useState(false)
    const fecha = useField({type:'date',defaultValue:time.fecha})
    const nrDoc = useField({type:'text'})
    const cliente = useField({type:'text'})
    const adelanto = useField({type:'number'})
    const final = useField({type:'number'})
    const total = useField({type:'number'})
    const citaChecked = useFieldChecked({})
    const observacion = useField({type:'text'})
    const { patientCreated } = useSelector(state=>state.pacientes)
    const dispatch = useDispatch(); 

    const reset = () =>{
        nrDoc.onChange('')
        cliente.onChange('')
        adelanto.onChange('')
        final.onChange('')
        observacion.onChange('')
        total.onChange('')
        citaChecked.onChange(false)
    }
    const tarificaCitaSelected = (tarifaCode) =>{
        const operationTarifaCita={
            'ct': _ =>{adelanto.onChange(0);final.onChange(50);total.onChange(50)},
            's':()=>{adelanto.onChange(0);final.onChange(0);total.onChange(0)},
            'v':()=>{adelanto.onChange(0);final.onChange(0);total.onChange(0)},
            'mt':()=>{adelanto.onChange(25);final.onChange(0);total.onChange(25)},
            'r':()=>{adelanto.onChange(50);final.onChange(0);total.onChange(50)}
        }
        return operationTarifaCita[tarifaCode]()
    }

    const tarifaAdelantoSelected = (adelantoCOde)=>{
        const operationsAdelantoCita={
            'a20': ()=>{adelanto.onChange(20);final.onChange(0);total.onChange(20)},
            'a30': ()=>{adelanto.onChange(30);final.onChange(0);total.onChange(30)},
            'r':()=>{adelanto.onChange(50);final.onChange(0);total.onChange(50)}
        }
        return operationsAdelantoCita[adelantoCOde]()
    }

    useEffect(() => {
        total.onChange( (parseInt(adelanto.value)|| 0) + (parseInt(final.value) || 0))
    }, [adelanto.value, final.value])
    
    useEffect(() => {
        setCita({
            doc:nrDoc.value,
            advancement:adelanto.value,
            balance:final.value,
            obs:observacion.value,
            date:fecha.value,
            hour:hora.value,
            total:total.value,
            dateCheck:citaChecked.checked
        })
    }, [nrDoc.value, adelanto.value, final.value, observacion.value, fecha.value, hora.value, total.value, citaChecked.checked])
    
    useEffect(() => {
        if(dateCalendar) setTime(oldTime=>({hora:oldTime.hora,fecha:changeFormateDate(dateCalendar)}))
    }, [dateCalendar])
    
    useEffect(() => {
        cliente.onChange(patientCreated.NOMBRE)
    }, [patientCreated])
    

    useEffect(() => {
        const d = new Date()
        const fechaActual= `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${('0' + d.getDate()).slice(-2)}`
        const horaActual = `${('0' + d.getHours()).slice(-2)}:${('0' + d.getMinutes()).slice(-2)}`
        dispatch(setPatientCreate({}))
        return () => {
          setTime({fecha:fechaActual,hora:horaActual})
        }
    }, [])
    
  return (
    <div className="w-full form1">
        <h1 className="subtitle">Formulario de citas</h1>
        <div className='w-full mt-10 mx-auto grid grid-cols-4 gap-4'>
            <TopNamedInput
                {...fecha}
                label='Fecha'
            />  
            <TopNamedCombobox
                label='Hora'
                data={hoursDate}
                dataKey="value"
                textField="hour"
                value={hora}
                onSelect={ e => setHora(e.value) }
            />
            <TopNamedInput
                {...nrDoc}
                label='Nro Doc'
                onBlur={async(e)=>{
                    const name = (await Pacientes.requestAPatient(e.target.value))?.data.shift()?.NOMBRE
                    cliente.onChange(name)
                    if(name)  cliente.onChange(name)
                    else{
                        setNumeroDocumento(e.target.value)
                        setIsOpen(true)
                    } 
                }}
            />    
            <TopNamedInput
                {...cliente}
                label='Cliente'
            />
            <TopNamedInput
                {...observacion}
                label='Observación'
            />
            <CheckedComponent
                label='cita'
                {...citaChecked}
            />
            <TopNamedCombobox
                label='Tarifa cita'
                data={tarifaCitaOptions}
                dataKey="code"
                textField="name"
                onSelect={(e)=>tarificaCitaSelected(e.code)}
            />
            <TopNamedCombobox
                label='Tarifa adelanto'
                data={tarifaAdelantoOptions}
                dataKey="code"
                textField="name"
                onSelect={e=>tarifaAdelantoSelected(e.code)}
            />
             <TopNamedInput
                {...adelanto}
                label='Imp adelanto'
            />   
            <TopNamedInput
                {...final}
                label='Imp final'
            />  
            <TopNamedInput
                {...total}
                label='total'
                disabled
            />       
        </div>
        <div className="grid grid-cols-2 gap-4 w-1/2 mx-auto">
            <Button
                label="Cancelar"
                className="p-button-outlined p-button-danger"
                icon="pi pi-times"
                onClick={()=>reset()}
            />
            <Button
                label="Guardar"
                className="p-button-outlined"
                icon="pi pi-check"
                onClick={()=>{
                    const fecha = changeFormateDate(cita.date)
                    const newCita = {...cita,date:fecha,primerPago:fechaActualValue}
                    dispatch(createDate(newCita))
                    reset()
                }}
            />
        </div>
        <div className={isOpen ? '' :'hidden'}>
            <FormPersonaModal
                nroDoc={numeroDocumento}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        </div>
    </div>
  )
}
