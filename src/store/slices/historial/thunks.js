import Historial from "../../../apis/Historial";
import { isLoading, setHistorialSelected, changeIsExist } from "./historialSlice";

export const getHistorial = ({nroDoc, name}) => async( dispatch ) =>{
    dispatch(isLoading())
    let { data:historial } = (await Historial.getHistorialToOnePerson(nroDoc))
    if(historial.length  === 0){
        historial.nroDoc = nroDoc
        historial.name = name
        historial.code = nroDoc
        dispatch( changeIsExist(false) )
        dispatch( setHistorialSelected(historial) )
    } else{
        dispatch( changeIsExist(true) )
        dispatch( setHistorialSelected(historial[0]) )
    } 
}

export const createHistorial = (body) => async( dispatch ) =>{
    dispatch( isLoading() )
    await Historial.createHistorialToOnePerson( body )
    dispatch( getHistorial( {nroDoc:body.nroDoc }) )
}

export const updateHistorial = (body) => async( dispatch, getState ) =>{
    dispatch( isLoading() )
    const { id } = getState().historial.historialSelected
    await Historial.updateHistorialToOnePerson( id, body )
    dispatch( getHistorial( {nroDoc:body.nroDoc }) )
}