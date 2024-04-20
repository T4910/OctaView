import axios from "axios"

export async function deleteTimetable(id){
    const response = await axios.post(`${serverLink}/timetable/remove-timetable`, { id })
    
    console.log(response, 87)
    return response
}   

export async function makeCurrent(id){
    const response = await axios.post(`${serverLink}/timetable/make-timetable-current`, { id })
    
    console.log(response, 87)
    return response
}
