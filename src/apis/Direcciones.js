import Api from "./Api";

const END_POINT = 'direcciones'

export default{
    getDirectionPersonal(nroDoc){
        const url = `${END_POINT}?docPersona=${nroDoc}`
        return Api.get(url)
    },
    createDirectionPersonal(body){
        return Api.post(END_POINT, body)
    },
    updateDirectionPersonal(id, body){
        return Api.put(`${END_POINT}/${id}`,body)
    }
}