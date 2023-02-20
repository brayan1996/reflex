import Api from "./Api";

const END_POINT = 'pacientes'

export default{
    requestPatients(){
        return Api.get(END_POINT)
    },
    requestAPatient(id){
        return Api.get(`${END_POINT}?DNI=${id}`)
    },
    updatePatient(id, body){
        return Api.put(END_POINT+ "/" + id, body)
    },
    createPatient( body ){
        return Api.post(END_POINT, body)
    },
    deletePatient(id){
        return Api.delete(`${END_POINT}/${id}`)
    },
    requestTextSearch(text){
        return Api.get(`${END_POINT}?q=${text}`)
    }
}