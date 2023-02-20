import Api from "./Api";

const END_POINT = 'terapeutas'

export default{
    requestTherapist(){
        return Api.get(END_POINT)
    },
    requestATherapist(id){
        return Api.get(`${END_POINT}?CARNET=${id}`)
    },
    updateTherapist(id, body){
        return Api.put(END_POINT+ "/" + id, body)
    },
    createTherapist( body ){
        return Api.post(END_POINT, body)
    },
    deleteTherapist(id){
        return Api.delete(`${END_POINT}/${id}`)
    },
    requestTextSearch(text){
        return Api.get(`${END_POINT}?q=${text}`)
    }
}