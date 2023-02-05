import Direcciones from "../../../apis/Direcciones";
import { isLoading, setDirectionPersonal } from "./direccionesSlice";

export const getDirectionToOnePerson = (nrDoc) => async(dispatch) =>{
    dispatch(isLoading())
    const direction = (await Direcciones.getDirectionPersonal(nrDoc)).data?.shift()
    dispatch(setDirectionPersonal(direction))
}

export const createDirectionPersonal = (body) => async(dispatch) =>{
    await Direcciones.createDirectionPersonal(body)
    dispatch( getDirectionToOnePerson(body.docPersona) )
}