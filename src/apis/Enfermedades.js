import Api from "./Api";

const END_POINT='enfermedades'

export default{
    getAllDiseases(){
        return Api.get(END_POINT)
    },
    getADiseases(code){
        const endpoint = `${END_POINT}?code=${code}`
        return Api.get( endpoint )
    },
    createADiseases(body){
        return Api.post(END_POINT, body)
    },
    updateADiseases(id, body){
        const endpoint = `${END_POINT}/${id}`
        return Api.put( endpoint, body )
    },
    deleteDiseas(id){
        return Api.delete(END_POINT + "/" + id)
    }

}