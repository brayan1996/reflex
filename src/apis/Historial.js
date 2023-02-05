import Api from "./Api";
const END_POINT = 'historial'
export default{
    getHistorialToOnePerson(nroDoc){
        return Api.get(`${END_POINT}?nroDoc=${nroDoc}`)
    },
    createHistorialToOnePerson(body){
        return Api.post(END_POINT, body)
    },
    updateHistorialToOnePerson(id, body){
        return Api.put(END_POINT + "/" + id, body)
    }
}