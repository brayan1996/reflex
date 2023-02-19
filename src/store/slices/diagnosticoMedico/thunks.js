import DiagnosticoMedico from "../../../apis/DiagnosticoMedico";
import { setDiagnosis, finishLoading, setLoading, selectADiagnosis } from "./diagnosticoMedicoSlice";
import { adaptKeys } from "../../../helpers/transformObjects";

const keysValues= {code:'CODIGO', name:'NOMBRE'}

export const getAllDiagnosis = () => async(dispatch) =>{
    dispatch( setLoading() )
    try {
        const {data:diagnosis} = await DiagnosticoMedico.requestAllDiagnosis()
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
        await DiagnosticoMedico.deleteDiagnosis(id)
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
        const {data:diagnosisUpdateItem} = await DiagnosticoMedico.updateDiagnosis(id, newBody)
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
        await DiagnosticoMedico.createDiagnosis(adaptKeys(body, keysValues))
        dispatch( getAllDiagnosis() )
    } catch (error) {
        console.log(error)
    } finally{
        dispatch( finishLoading() )
    }
}