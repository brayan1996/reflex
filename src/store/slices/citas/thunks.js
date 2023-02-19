import { setDates, loadingDates } from "./citasSlice";
import Citas from "../../../apis/Citas";
import Pacientes from "../../../apis/Pacientes";

export const requestDates = (dates) => {
    return async( dispatch ) => {
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