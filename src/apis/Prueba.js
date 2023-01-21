import Api from "./Api";

const END_POINT = 'posts'

export default{
    all(){
        return Api.get(END_POINT)
    }
}