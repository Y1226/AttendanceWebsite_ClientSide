import axios from "axios"

export const GetAllMajors = () => {
    return (axios.get('https://localhost:44367/api/Major/GetAllMajors'))
}

export const GetTheMajorsWithMoreDetailsBySeminarCode = (seminarCode) => {
    return (axios.get(`https://localhost:44367/api/Major/GetTheMajorsWithMoreDetailsBySeminarCode/${seminarCode}`))
}