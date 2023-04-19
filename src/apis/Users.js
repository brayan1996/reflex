import Api from "./Api";

const END_POINT = 'users'

export default{
    getUserWithEmailAndPassword({ email, password }){
        return Api.get(`${END_POINT}?email=${email}&password=${password}`)
    },
    getUserWithNameAndPassword({nameLogin, password}){
        return Api.get(`${END_POINT}?nameLogin=${nameLogin}&password=${password}`)
    },
    createUser(body){
        return Api.post(END_POINT,body)
    }
}