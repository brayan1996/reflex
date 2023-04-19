import { setDates, loadingDates, finishLoading }    from "./citasSlice";
import Citas                                        from "../../../apis/Citas";
import Pacientes                                    from "../../../apis/Pacientes";
import { deleteElementsDuplicateArrayOfObjects }    from "../../../helpers/transformArrays";

export const requestDates = (dates) => {
    return async( dispatch, getState ) => {
        //Regresa el actual árbol de estado de tu aplicación. Es igual al último valor regresado por los reducers del store. 
        // console.log(getState())
        dispatch( loadingDates() )
        const {data:allCitas} = await Citas.getAppointmentByDate(dates)
        for (const cita of allCitas) {
            const { NOMBRE } = (await Pacientes.requestAPatient(cita.doc)).data[0] || {NOMBRE:''}
            cita.cliente = NOMBRE
        }
        dispatch( setDates({allCitas}) )
    }
}

export const modifyDate = (body) =>{
    return async( dispatch )=>{
        const { cliente, ...restBody } = body
        await Citas.updateAppointment(body.id,restBody )
        dispatch(requestDates(body.date))
    }
}

export const deleteDate = (body) => async( dispatch ) =>{
    await Citas.deleteAppointment(body.id)
    dispatch(requestDates(body.date))
}

export const createDate = (body) => async(dispatch)=>{
    await Citas.createAppointment(body)
    dispatch( requestDates(body.date) )
}

export const requestCitasTextSearch = (text, fecha) => async(dispatch, /* getState */) =>{
    dispatch( loadingDates() )
    try {
        const req1 = Citas.requestTextSearch(text)
        const req2 = Pacientes.requestTextSearch(text)
        const [{data:allCitas}, {data:pacientes}] = await Promise.all([req1, req2])
        const citasDePaciente = ( await Promise.all(pacientes.map( async paciente=> ( await Citas.requestTextSearch(paciente.DNI) ).data)) ).flat()
        const citasDelPacienteConNmbre = deleteElementsDuplicateArrayOfObjects(
            [...citasDePaciente, ...allCitas].map( citaPaciente=>{
                const name = pacientes.find( paciente => paciente.DNI === citaPaciente.doc )?.NOMBRE || ''
                return({...citaPaciente, cliente:name})
            } )
        )
        const citasSearch = citasDelPacienteConNmbre.filter( cita=> cita.date === fecha )
        dispatch( setDates({allCitas:citasSearch}) )
    } catch (error) {
        console.log(error)
    } finally{
        dispatch( finishLoading() ) 
    }

}
