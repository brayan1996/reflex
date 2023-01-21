import { setDates, loadingDates } from "./citasSlice";
import Citas from "../../../apis/Citas";
import Personas from "../../../apis/Personas";
export const requestDates = (dates) => {
    return async( dispatch ) => {
        dispatch( loadingDates() )
        const {data:allCitas} = await Citas.getAppointmentByDate(dates)
        for (const cita of allCitas) {
            const { nombre } = (await Personas.getPersonByDocument(cita.doc)).data[0] || {nombre:''}
            cita.cliente = nombre
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

export const createDate = (body) => async()=>{
    await Citas.createAppointment(body)
}