import Api from "./Api";

const END_POINT = 'citas'

export default{
    getAppointmentByDate(date){
        const url = `${END_POINT}?date=${date}`
        return Api.get(url)
    },
    updateAppointment(id, body){
        return Api.put(END_POINT+ "/" + id, body)
    },
    deleteAppointment(id){
        return Api.delete(END_POINT + "/" + id)
    },
    createAppointment(body){
        return Api.post(END_POINT, body)
    },
    requestTextSearch(text){
        return Api.get(`${END_POINT}?q=${text}`)
    }
}