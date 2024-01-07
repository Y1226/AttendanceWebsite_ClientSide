import axios from "axios"

export const GetFullStaffData = () => {
    return axios.get('https://localhost:44367/api/Staff/GetFullStaffData')
}

export const GetFullStaffDataBySeminarCode = (seminarCode) => {
    return (axios.get(`https://localhost:44367/api/Staff/GetFullStaffDataBySeminarCode/${seminarCode}`))
}