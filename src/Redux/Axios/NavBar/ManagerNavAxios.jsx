import axios from "axios"

export const GetSeminarBySeminarCode = (seminarCode) => {
    return (axios.get(`https://localhost:44367/api/Seminar/GetSeminarBySeminarCode/${seminarCode}`))
}