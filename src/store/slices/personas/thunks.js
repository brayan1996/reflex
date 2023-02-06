import Personas from "../../../apis/Personas";
import { loadingPersons, setPersons, setAPerson, loadingFinished } from './personasSlice'
import { getDirectionToOnePerson } from '../direcciones';

export const requestPersons = () => async (dispatch) =>{
    dispatch( loadingPersons() )
    try {
        const {data:allPersons} = await Personas.getAllPersons()
        dispatch( setPersons({allPersons}) )
    } catch (error) {
        console.log(error)
    } finally{  
        dispatch( loadingFinished() )
    }
}

export const updateOnePerson = (id, body) => async(dispatch) => {
    try {
        await Personas.updatePerson(id, body)
        dispatch( requestPersons() )
    } catch (error) {
        console.log(error)
    } finally{  
        dispatch( loadingFinished() )
    }
}

export const createPerson = ( body ) => async(dispatch) => {
    try {
        await Personas.createPerson(body)
        dispatch( requestPersons() )
    } catch (error) {
        console.log(error)
    } finally{  
        dispatch( loadingFinished() )
    }
}

export const selectAPerson = (person) => async( dispatch ) =>{
    try {
        const {data:fetchPerson} = await Personas.getPersonByDocument(person.nroDoc)
        dispatch( setAPerson(fetchPerson?.shift()) )
        dispatch( getDirectionToOnePerson(person.nroDoc) )
    } catch (error) {
        console.log(error)
    } finally{  
        dispatch( loadingFinished() )
    }
}

export const deleteAPerson = (id) =>async(dispatch) =>{
    try {
        await Personas.deletePerson(id)
        dispatch( requestPersons() )
    } catch (error) {
        console.log(error)
    } finally{  
        dispatch( loadingFinished() )
    }
}