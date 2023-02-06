import Direcciones from "../../../apis/Direcciones";
import { isLoading, setDirectionPersonal, loadingFinished } from "./direccionesSlice";

export const getDirectionToOnePerson = (nrDoc) => async(dispatch) =>{
    dispatch(isLoading())
    try {
        const direction = (await Direcciones.getDirectionPersonal(nrDoc)).data?.shift()
        dispatch(setDirectionPersonal(direction))
    } catch (error) {
        console.log(error)
    } finally{
        dispatch(loadingFinished())
    }
}

export const createDirectionPersonal = (body) => async(dispatch) =>{
    try {
        await Direcciones.createDirectionPersonal(body)
        dispatch( getDirectionToOnePerson(body.docPersona) )
    } catch (error) {
        console.log(error)
    } finally{
        dispatch(loadingFinished())
    }
}

export const updateDirecionPersonal = ( id, body ) => async( dispatch )=>{
    try {
        await Direcciones.updateDirectionPersonal(id, body)
        dispatch( getDirectionToOnePerson(body.docPersona) )
    } catch (error) {
        console.log(error)
    } finally{
        dispatch(loadingFinished())
    }
}