import DiagnosticoInterno from "../../../apis/DiagnosticoInterno";
import { setDiagnosis, finishLoading, setLoading, selectADiagnosis } from "./diagnosticoInternoSlice";
import { adaptKeys } from "../../../helpers/transformObjects";

const keysValues= {code:'CODIGO', name:'DESCRIP1'}

export const getAllDiagnosis = () => async(dispatch) =>{
    dispatch( setLoading() )
    try {
        const {data:diagnosis} = await DiagnosticoInterno.requestAllDiagnosis()
        dispatch(setDiagnosis(diagnosis))
    } catch (error) {
        console.log(error)
    } finally{
        dispatch( finishLoading() )
    }
}

export const deleteDiagnosis = (id) => async(dispatch, /* getState */) =>{
    dispatch( setLoading() )
    try {
        await DiagnosticoInterno.deleteDiagnosis(id)
        dispatch( getAllDiagnosis() )
    } catch (error) {
        console.log(error)
    } finally{
        dispatch( finishLoading() )
    }
}

export const updateDiagnosis = (id, body) => async(dispatch, /* getState */) =>{
    dispatch( setLoading() )
    try {
        const newBody = adaptKeys(body, keysValues)
        const {data:diagnosisUpdateItem} = await DiagnosticoInterno.updateDiagnosis(id, newBody)
        dispatch( selectADiagnosis(diagnosisUpdateItem) )
        dispatch( getAllDiagnosis() )
    } catch (error) {
        console.log(error)
    } finally{
        dispatch( finishLoading() )
    }
}

export const createDiagnosis = (body) => async(dispatch, /* getState */) =>{
    dispatch( setLoading() )
    try {
        await DiagnosticoInterno.createDiagnosis(adaptKeys(body, keysValues))
        dispatch( getAllDiagnosis() )
    } catch (error) {
        console.log(error)
    } finally{
        dispatch( finishLoading() )
    }
}