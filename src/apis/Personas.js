import { createPerson } from "../store/slices/personas";
import Api from "./Api";

const END_POINT = 'personas'

export default{
    getPersonByDocument(nroDoc){
        const url = `${END_POINT}?nroDoc=${nroDoc}`
        return Api.get(url)
    },
    getAllPersons(){
        return Api.get(END_POINT)
    },
    updatePerson(id, body){
        return Api.put(END_POINT+ "/" + id, body)
    },
    createPerson( body ){
        return Api.post(END_POINT, body)
    },
    deletePerson(id){
        return Api.delete(`${END_POINT}/${id}`)
    }
}