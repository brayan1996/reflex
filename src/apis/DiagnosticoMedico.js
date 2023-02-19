import Api from "./Api";

const END_POINT = 'diagnosticoMedico'

export default{
    requestAllDiagnosis(){
        return Api.get(END_POINT)
    },
    deleteDiagnosis(id){
        return Api.delete(END_POINT + "/" + id)
    },
    updateDiagnosis(id, body){
        return Api.put(END_POINT+ "/" + id, body)
    },
    createDiagnosis(body){
        return Api.post(END_POINT, body)
    }
}