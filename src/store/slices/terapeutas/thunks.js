import Terapeutas from "../../../apis/Terapeutas";
import { requestTerapeutas, loadingTerapeutasAction, finishLoading, seleactATherapist } from "./terapeutasSlice";
import { adaptKeys } from "../../../helpers/transformObjects";

const keysValues=  {
    "nombre": "NOMBRE",
    "nacimiento": 'FECNAC',
    "sexo": "SEXO",
    "dir": "DIRECCION",
    "dpto": "DPTO",
    "prov": "PROV",
    "dist": "DISTRITO",
    "nroDoc": "CARNET",
    "telefono": "TELF",
    "email": "EMAIL",
}

export const getTherapist = () => async( dispatch ) =>{
    dispatch( loadingTerapeutasAction() )
    try {
        const { data:terapeutas } = await Terapeutas.requestTherapist()
        dispatch( requestTerapeutas(terapeutas) )
    } catch (error) {
        console.log(error)
    } finally{
        dispatch( finishLoading() )
    }
}


export const deleteTherapist = (id) => async(dispatch, /* getState */) =>{
    dispatch( loadingTerapeutasAction() )
    try {
        await Terapeutas.deleteTherapist(id)
        dispatch(getTherapist())
    } catch (error) {
        console.log(error)
    } finally{
        dispatch( finishLoading() )
    }
}

export const updateTherapist = (id, body) => async(dispatch, /* getState */) =>{
    dispatch( loadingTerapeutasAction() )
    try {
        const {data:newTherapist} = await Terapeutas.updateTherapist(id, adaptKeys(body, keysValues))
        dispatch(seleactATherapist(newTherapist))
        dispatch(getTherapist())
    } catch (error) {
        console.log(error)
    } finally{
        dispatch( finishLoading() )
    }
}

export const createTherapist = (body) => async(dispatch, /* getState */) =>{
    dispatch( loadingTerapeutasAction() )
    try {
        await Terapeutas.createTherapist(adaptKeys(body, keysValues))
        dispatch(getTherapist())
    } catch (error) {
        console.log(error)
    } finally{
        dispatch( finishLoading() )
    }
}