import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import TopNamedInput from "../../../components/inputs/TopNamedInput/TopNamedInput"
import { useField } from "../../../hooks/useField"
import Personas from "../../../apis/Personas";
import { createDate } from "../../../store/slices/citas";

const changeFormateDate = (date) => (date?.split('-').reverse().join('-'))
export const FormCreateCitas = ({dateCalendar}) => {
    const [time, setTime] = useState({fecha:'',hora:''})
    const [cita, setCita] = useState({})
    const fecha = useField({type:'date',defaultValue:time.fecha})
    const hora = useField({type:'time',defaultValue:time.hora})
    const nrDoc = useField({type:'text'})
    const cliente = useField({type:'text'})
    const adelanto = useField({type:'text'})
    const saldo = useField({type:'text'})
    // const op = useField({type:'text'})
    const observacion = useField({type:'text'})
    const dispatch = useDispatch(); 

    const reset = () =>{
        nrDoc.onChange('')
        cliente.onChange('')
        adelanto.onChange('')
        saldo.onChange('')
        observacion.onChange('')
    }
    useEffect(() => {
        setCita({
            doc:nrDoc.value,
            advancement:adelanto.value,
            balance:saldo.value,
            obs:observacion.value,
            date:fecha.value,
            hour:hora.value
        })
    }, [nrDoc.value, adelanto.value, saldo.value, observacion.value, fecha.value, hora.value])
    
    useEffect(() => {
        if(dateCalendar) setTime(oldTime=>({hora:oldTime.hora,fecha:changeFormateDate(dateCalendar)}))
    }, [dateCalendar])
    
    useEffect(() => {
        const d = new Date()
        const fechaActual= `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${('0' + d.getDate()).slice(-2)}`
        const horaActual = `${('0' + d.getHours()).slice(-2)}:${('0' + d.getMinutes()).slice(-2)}`
        return () => {
          setTime({fecha:fechaActual,hora:horaActual})
        }
    }, [])
    

  return (
    <div className="w-full form1">
        <h1 className="subtitle">Formulario de citas</h1>
        <div className='w-full h-96 mt-10 mx-auto grid grid-cols-4 gap-4'>
            <TopNamedInput
                {...fecha}
                label='Fecha'
            />    
            <TopNamedInput
                {...hora}
                label='Hora'
            /> 
            <TopNamedInput
                {...adelanto}
                label='Adelanto'
            />    
            <TopNamedInput
                {...saldo}
                label='Saldo'
            />  
            <TopNamedInput
                {...nrDoc}
                label='Nro Doc'
                onBlur={async(e)=>{
                    const name = (await Personas.getPersonByDocument(e.target.value)).data[0]?.nombre || ''
                    cliente.onChange(name)
                }}
            />    
            <TopNamedInput
                {...cliente}
                label='Cliente'
            />
            {/* <TopNamedInput
                {...op}
                label='Op'
            />     */}
            <TopNamedInput
                {...observacion}
                label='Observación'
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
                    const newCita = {...cita,date:fecha}
                    dispatch(createDate(newCita))
                    reset()
                }}
            />
        </div>
    </div>
  )
}
