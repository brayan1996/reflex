import Pacientes from "../../../apis/Pacientes";
import { loadingPatientsAction, finishLoadingPatients, requestPatients, seleactAPatient, setPatientCreate } from "./pacientesSlice";
import { adaptKeys } from "../../../helpers/transformObjects";

const keysValues=  {
    "nombre": "NOMBRE",
    "nacimiento": 'FECNAC',
    "sexo": "SEXO",
    "dir": "DIRECC",
    "dpto": "DPTO",
    "prov": "PROV",
    "dist": "DIST",
    "nroDoc": "DNI",
    "telefono": "TELF",
    "email": "EMAIL",
    "ocupacion":"OCUPACION",
    "observacion":"OBSERVA",
    "testimonio":"TESTIMONIO",
    "resultado":"RESULTADO",
}

export const getPatient = () => async( dispatch ) =>{
    dispatch( loadingPatientsAction() )
    try {
        const { data:pacientes } = await Pacientes.requestPatients()
        dispatch( requestPatients(pacientes) )
    } catch (error) {
        console.log(error)
    } finally{
        dispatch( finishLoadingPatients() )
    }
}


export const deletePatient = (id) => async(dispatch, /* getState */) =>{
    dispatch( loadingPatientsAction() )
    try {
        await Pacientes.deletePatient(id)
        dispatch(getPatient())
    } catch (error) {
        console.log(error)
    } finally{
        dispatch( finishLoadingPatients() )
    }
}

export const updatePatient = (id, body) => async(dispatch, /* getState */) =>{
    dispatch( loadingPatientsAction() )
    try {
        const {data:newPatient} = await Pacientes.updatePatient(id, adaptKeys(body, keysValues))
        dispatch(seleactAPatient(newPatient))
        dispatch(getPatient())
    } catch (error) {
        console.log(error)
    } finally{
        dispatch( finishLoadingPatients() )
    }
}

export const createPatient = (body) => async(dispatch, /* getState */) =>{
    dispatch( loadingPatientsAction() )
    try {
        const{data:patient} = await Pacientes.createPatient(adaptKeys(body, keysValues))
        dispatch(setPatientCreate(patient))
        dispatch(getPatient())
    } catch (error) {
        console.log(error)
    } finally{
        dispatch( finishLoadingPatients() )
    }
}

export const requestPatientsTextSearch = (text) => async(dispatch, /* getState */) =>{
    dispatch( loadingPatientsAction() )
    try {
        const { data:pacientes } = await Pacientes.requestTextSearch(text)
        dispatch( requestPatients(pacientes) )
    } catch (error) {
        console.log(error)
    } finally{
        dispatch( finishLoadingPatients() ) 
    }

}