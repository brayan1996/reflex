import Personas from "../../../apis/Personas";
import { loadingPersons, setPersons } from './personasSlice'

export const requestPersons = () => async (dispatch) =>{
    dispatch( loadingPersons() )
    const {data:allPersons} = await Personas.getAllPersons()
    dispatch( setPersons({allPersons}) )
}

// export const requestPersonByNroDoc = (nroDoc) => async() =>{
//     const person = (await Personas.getPersonByDocument(nroDoc)).data?.shift()
// }

export const updateOnePerson = (id, body) => async(dispatch) => {
    await Personas.updatePerson(id, body)
    dispatch( requestPersons() )
}

export const createPerson = ( body ) => async(dispatch) => {
    await Personas.createPerson(body)
    dispatch( requestPersons() )
}