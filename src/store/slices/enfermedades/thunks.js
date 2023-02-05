import Enfermedades from "../../../apis/Enfermedades";
import { loadingDiseases, endLoadingDiseases, setAllDiseases, setDiseasesSelected } from "./enfermedadesSlice";

export const getAllDiseases = () => async( dispatch ) =>{
    dispatch( loadingDiseases() )
    const { data:allDiseases } = await Enfermedades.getAllDiseases()
    dispatch( setAllDiseases(allDiseases) )
}

export const createDisease = (body) => async(dispatch) =>{
    dispatch( loadingDiseases() )
    try {
        const { data } = await Enfermedades.createADiseases( body )
        dispatch( getAllDiseases() )
        dispatch(setDiseasesSelected({id:data.id,...body}))
    } catch (error) {
        console.log(error)
    } finally{
        dispatch(endLoadingDiseases())
    }
}

export const updateDisease = (id, body) => async(dispatch) =>{
    dispatch( loadingDiseases() )
    try {
        await Enfermedades.updateADiseases(id, body)
        dispatch( getAllDiseases() )
        dispatch(setDiseasesSelected({id,...body}))
    } catch (error) {
        console.log(error)
    } finally{
        dispatch(endLoadingDiseases())
    }
}

export const deleteDisease = (id) => async( dispatch ) =>{
    dispatch( loadingDiseases() )
    try {
        await Enfermedades.deleteDiseas(id)
        dispatch( getAllDiseases() )
    } catch (error) {
        console.log(error)
    } finally{
        dispatch(endLoadingDiseases())
    }
}